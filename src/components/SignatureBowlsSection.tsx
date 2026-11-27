"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import menuData from "@/data/menu.json";
import { SakuraPetals, SteamWisps } from "./JapaneseDecor";

gsap.registerPlugin(ScrollTrigger);

export function SignatureBowlsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const bowls = menuData.signatureBowls;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 120);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  const scrollMobileBy = (dir: -1 | 1) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section
      id="bowls"
      ref={sectionRef}
      className="relative bg-[#0D0B0A] text-[#F3EDE2] overflow-hidden border-y border-[#C9A24B]/15"
    >
      <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 opacity-60" />
      <SteamWisps />
      <SakuraPetals />

      {/* Desktop Pinned Horizontal Showcase */}
      <div className="hidden lg:flex flex-col justify-center min-h-screen py-16 relative z-10">
        <div className="mx-auto w-full max-w-7xl px-8 mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#C9A24B] mb-3">
              Signature Bowls · 名物の一杯
            </p>
            <h2 className="font-serif text-4xl xl:text-5xl text-[#F3EDE2]">
              Crafted Over Slow Broth & Flame
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.26em] text-[#9A9083]">
            Scroll to explore 01 — 0{bowls.length}
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex items-stretch gap-10 pl-8 xl:pl-[calc((100vw-80rem)/2+2rem)] pr-24 will-change-transform"
        >
          {bowls.map((dish) => (
            <article
              key={dish.index}
              className="w-[460px] xl:w-[500px] shrink-0 group flex flex-col"
            >
              <div
                data-cursor="image"
                className="relative aspect-[4/3] w-full overflow-hidden border border-[#C9A24B]/45 bg-[#1A1613] rounded-[2px] p-1.5 transition-colors duration-500 group-hover:border-[#C9A24B]"
              >
                <div className="relative w-full h-full overflow-hidden rounded-[1px]">
                  <Image
                    src={dish.image}
                    alt={`${dish.name} — ${dish.description}`}
                    fill
                    sizes="500px"
                    className="object-cover photo-warm transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/80 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#0D0B0A]/80 border border-[#C9A24B]/40 text-[10px] uppercase tracking-[0.24em] text-[#C9A24B]">
                    {dish.tag}
                  </span>
                  <span className="absolute bottom-3.5 right-4 font-serif text-3xl text-[#F3EDE2]/25">
                    {dish.index}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#C9A24B]">
                      {dish.index}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F3EDE2]">
                      {dish.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-[#C9A24B]/70 font-serif tracking-widest">
                    {dish.jpName}
                  </p>
                </div>
                <span className="font-serif text-xl text-[#F3EDE2] shrink-0">
                  {dish.price}
                </span>
              </div>

              <p className="mt-2.5 text-sm text-[#9A9083] leading-relaxed">
                {dish.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Swipe Carousel */}
      <div className="lg:hidden py-20 relative z-10">
        <div className="px-5 sm:px-8 flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A24B] mb-2">
              Signature Bowls · 名物
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F3EDE2]">
              Crafted Over Slow Broth
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollMobileBy(-1)}
              aria-label="Previous signature bowl"
              className="w-9 h-9 border border-[#C9A24B]/40 flex items-center justify-center text-[#F3EDE2] hover:border-[#C9A24B] rounded-[2px]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileBy(1)}
              aria-label="Next signature bowl"
              className="w-9 h-9 border border-[#C9A24B]/40 flex items-center justify-center text-[#F3EDE2] hover:border-[#C9A24B] rounded-[2px]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={mobileScrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 no-scrollbar pb-4"
        >
          {bowls.map((dish) => (
            <article
              key={dish.index}
              className="w-[82vw] max-w-[340px] shrink-0 snap-start"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#C9A24B]/45 bg-[#1A1613] rounded-[2px] p-1">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={`${dish.name} — ${dish.description}`}
                    fill
                    sizes="340px"
                    className="object-cover photo-warm"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/75 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0D0B0A]/80 border border-[#C9A24B]/40 text-[10px] uppercase tracking-[0.2em] text-[#C9A24B]">
                    {dish.tag}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-[#C9A24B]">
                    {dish.index}
                  </span>
                  <h3 className="font-serif text-xl text-[#F3EDE2]">
                    {dish.name}
                  </h3>
                </div>
                <span className="font-serif text-lg text-[#F3EDE2] shrink-0">
                  {dish.price}
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-[#9A9083] leading-relaxed">
                {dish.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
