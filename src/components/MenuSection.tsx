"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import menuData from "@/data/menu.json";
import { EnsoCircle, SumiBrushDivider } from "./JapaneseDecor";

interface VariantPrice {
  label: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  jpName: string;
  description: string;
  dietary: "veg" | "non-veg" | "both";
  price?: number | null;
  priceLabel?: string;
  variants?: VariantPrice[];
  secondaryVariants?: {
    label: string;
    variants: VariantPrice[];
  };
  image?: string;
  todo?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  jpLabel: string;
  subtitle: string;
  items: MenuItem[];
}

function DietaryMarker({ type }: { type: "veg" | "non-veg" | "both" }) {
  if (type === "both") {
    return (
      <span className="inline-flex items-center gap-1 shrink-0" title="Veg & Non-Veg options">
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-[#1E7A3E] rounded-[1px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A3E]" />
        </span>
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-[#C8161D] rounded-[1px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8161D]" />
        </span>
      </span>
    );
  }
  const isVeg = type === "veg";
  return (
    <span
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      className={`inline-flex items-center justify-center w-3.5 h-3.5 border rounded-[1px] shrink-0 ${
        isVeg ? "border-[#1E7A3E]" : "border-[#C8161D]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isVeg ? "bg-[#1E7A3E]" : "bg-[#C8161D]"
        }`}
      />
    </span>
  );
}

function renderPrice(item: MenuItem) {
  if (item.variants && item.variants.length > 0) {
    return (
      <div className="flex flex-wrap items-baseline justify-end gap-x-2 gap-y-0.5 text-right font-serif text-sm sm:text-base text-[#1A1613] tabular-nums">
        {item.variants.map((v, i) => (
          <span key={v.label} className="inline-flex items-baseline whitespace-nowrap">
            {i > 0 && <span className="mr-1.5 text-[#8E6F2B]/40 font-sans text-xs">/</span>}
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8E6F2B] font-sans mr-1">
              {v.label}
            </span>
            <span>₹{v.price}</span>
          </span>
        ))}
      </div>
    );
  }
  if (typeof item.price === "number") {
    return (
      <span className="font-serif text-sm sm:text-base text-[#1A1613] tabular-nums whitespace-nowrap">
        ₹{item.price}{item.todo && item.todo.includes("~") ? "*" : ""}
      </span>
    );
  }
  return (
    <span className="font-serif text-xs sm:text-sm text-[#8E6F2B] tabular-nums whitespace-nowrap">
      {item.priceLabel ?? "TBD"}
    </span>
  );
}

export function MenuSection() {
  const categories = menuData.categories as MenuCategory[];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [hoveredDish, setHoveredDish] = useState<{
    image: string;
    name: string;
  } | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced || !previewRef.current) return;

    xTo.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.32,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.32,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace("menu-cat-", ""));
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
    );

    categories.forEach((cat) => {
      const el = document.getElementById(`menu-cat-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(e.clientX + 26);
    yTo.current(e.clientY - 75);
  };

  const jumpToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`menu-cat-${catId}`);
    if (!el) return;
    if (window.__hosshiLenis) {
      window.__hosshiLenis.scrollTo(el, { offset: -125 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = categories[(index + 1) % categories.length];
      jumpToCategory(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = categories[(index - 1 + categories.length) % categories.length];
      jumpToCategory(prev.id);
      document.getElementById(`tab-${prev.id}`)?.focus();
    }
  };

  return (
    <section
      id="menu"
      onMouseMove={handleMouseMove}
      className="relative bg-[#F3EDE2] text-[#1A1613] seigaiha-light py-24 sm:py-32"
    >
      {/* Floating Desktop Hover Dish Preview */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden lg:block w-60 h-[180px] border border-[#C9A24B] bg-[#0D0B0A] p-1 rounded-[2px] shadow-2xl transition-opacity duration-200 ${
          hoveredDish ? "opacity-100" : "opacity-0"
        }`}
      >
        {hoveredDish && (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={hoveredDish.image}
              alt=""
              fill
              sizes="240px"
              className="object-cover photo-warm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/80 via-transparent to-transparent" />
            <p className="absolute bottom-2 left-2.5 right-2.5 font-serif text-xs text-[#F3EDE2] truncate">
              {hoveredDish.name}
            </p>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Heading */}
        <div className="relative text-center max-w-2xl mx-auto mb-12">
          <EnsoCircle
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56"
            color="#C9A24B"
            opacity={0.2}
          />
          <p className="relative z-10 text-[11px] uppercase tracking-[0.36em] text-[#8E6F2B] font-medium">
            The Menu · お品書き
          </p>
          <h2 className="relative z-10 mt-3 font-serif text-4xl sm:text-5xl text-[#1A1613]">
            From the Counter Kitchen
          </h2>
          <p className="relative z-10 mt-4 text-sm text-[#5E5449] leading-relaxed">
            Every broth is simmered for depth, every katsu fried to order.
            Hover dishes on desktop for a closer look.
          </p>
        </div>

        {/* Sticky Category Tabs */}
        <div className="sticky top-[61px] md:top-[69px] z-30 -mx-5 sm:mx-0 px-5 sm:px-0 py-3 bg-[#F3EDE2]/95 backdrop-blur-md border-y border-[#1A1613]/12">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar"
          >
            {categories.map((cat, index) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => jumpToCategory(cat.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`shrink-0 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] rounded-[2px] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8161D] ${
                    isActive
                      ? "bg-[#C8161D] text-[#F3EDE2] shadow-sm"
                      : "text-[#3F3830] hover:text-[#1A1613] hover:bg-[#1A1613]/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Paper Menu List */}
        <div className="mt-14 space-y-16">
          {categories.map((cat) => {
            const visibleItems = cat.items;

            if (visibleItems.length === 0) return null;

            return (
              <div
                key={cat.id}
                id={`menu-cat-${cat.id}`}
                className="scroll-mt-36"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#1A1613]/20">
                  <div className="flex items-baseline gap-3.5">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1613]">
                      {cat.label}
                    </h3>
                    <span className="font-serif text-sm text-[#8E6F2B] tracking-widest">
                      {cat.jpLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#5E5449] italic font-serif">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-8">
                  {visibleItems.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => {
                        if (item.image) {
                          setHoveredDish({ image: item.image, name: item.name });
                        }
                      }}
                      onMouseLeave={() => setHoveredDish(null)}
                      className="group relative py-1 min-w-0 transition-colors"
                    >
                      {/* Primary row: Marker + Dish Name + Dotted Leader + Price */}
                      <div className="flex items-baseline justify-between gap-2 min-w-0">
                        <div className="flex items-baseline gap-2 min-w-0 shrink">
                          <DietaryMarker type={item.dietary} />
                          <h4 className="font-serif text-base sm:text-lg text-[#1A1613] group-hover:text-[#C8161D] transition-colors leading-snug">
                            {item.name}
                          </h4>
                          <span className="hidden xl:inline font-serif text-[11px] text-[#8E6F2B]/80 shrink-0">
                            {item.jpName}
                          </span>
                        </div>

                        <span className="menu-leader shrink" aria-hidden="true" />

                        <div className="shrink-0 text-right">
                          {renderPrice(item)}
                        </div>
                      </div>

                      {/* Secondary variant (e.g. Veg Ramen M/L pricing) */}
                      {item.secondaryVariants && (
                        <div className="mt-1 pl-6 flex items-center justify-between text-xs text-[#1E7A3E]">
                          <span className="uppercase tracking-[0.16em] text-[10px]">
                            {item.secondaryVariants.label} Option
                          </span>
                          <span className="font-serif tabular-nums">
                            {item.secondaryVariants.variants
                              .map((v) => `${v.label} ₹${v.price}`)
                              .join("  /  ")}
                          </span>
                        </div>
                      )}

                      <p className="mt-1.5 pl-6 text-xs sm:text-[13px] text-[#5E5449] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Footnote */}
        <div className="mt-16 pt-8 border-t border-[#1A1613]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5E5449]">
          <p>
            All prices are in INR (₹). Items marked with * or TBD are pending
            final confirmation from the Hosshi kitchen.
          </p>
          <p className="font-serif text-[#8E6F2B]">
            Taxes as applicable · Dine-in & Takeaway
          </p>
        </div>

        <div className="mt-12">
          <SumiBrushDivider dark={false} />
        </div>
      </div>
    </section>
  );
}
