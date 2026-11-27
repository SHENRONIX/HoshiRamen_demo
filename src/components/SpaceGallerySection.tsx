"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SakuraPetals, SumiBrushDivider } from "./JapaneseDecor";

gsap.registerPlugin(ScrollTrigger);

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  jpCaption: string;
  spanClass: string;
  aspectClass: string;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/assets/interior-counter.webp",
    alt: "Long wooden counter seating at Hosshi Ramen illuminated by warm red lanterns",
    caption: "Counter seating under lantern light",
    jpCaption: "木製カウンター席",
    spanClass: "md:col-span-7",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/lantern-glow.webp",
    alt: "Glowing red chochin paper lantern hanging above framed Japanese art",
    caption: "Chochin glow & Tokyo woodblock prints",
    jpCaption: "提灯の灯り",
    spanClass: "md:col-span-5",
    aspectClass: "aspect-[3/4] md:aspect-[4/5]",
  },
  {
    src: "/assets/wall-decor.webp",
    alt: "Lantern-lit feature wall with Japanese banners, framed ukiyo-e posters, and menu",
    caption: "Warm plaster walls & Japanese prints",
    jpCaption: "壁面の装飾",
    spanClass: "md:col-span-6",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/assets/shelf-maneki.webp",
    alt: "Wooden shelf displaying golden maneki-neko, ceramic teapot, sakura bonsai, and chopsticks",
    caption: "Maneki-neko keepsakes & counter craft",
    jpCaption: "招き猫と茶器",
    spanClass: "md:col-span-6",
    aspectClass: "aspect-[3/4] md:aspect-[4/3]",
  },
];

export function SpaceGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".space-card",
        { clipPath: "inset(12% 0% 12% 0%)", opacity: 0.2 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight")
        setLightboxIdx((i) => (i === null ? null : (i + 1) % galleryPhotos.length));
      if (e.key === "ArrowLeft")
        setLightboxIdx((i) =>
          i === null
            ? null
            : (i - 1 + galleryPhotos.length) % galleryPhotos.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx]);

  return (
    <section
      id="space"
      ref={sectionRef}
      className="relative bg-[#1A1613] text-[#F3EDE2] py-24 sm:py-32 overflow-hidden"
    >
      <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 opacity-60" />
      <SakuraPetals />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#C9A24B] mb-3">
              The Space · 空間
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#F3EDE2]">
              Long Wooden Counters &amp; Lantern-Lit Walls
            </h2>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-[15px] text-[#B8AE9F] leading-relaxed">
            Step past the doorway into an intimate room built around twin wooden
            counters, soft under-glow lighting, crimson chochin lanterns, and
            curated Japanese prints. Click any frame to inspect.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {galleryPhotos.map((photo, idx) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              data-cursor="image"
              aria-label={`Open gallery image: ${photo.caption}`}
              className={`space-card group text-left w-full ${photo.spanClass} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B]`}
            >
              <div
                className={`relative w-full ${photo.aspectClass} border border-[#C9A24B]/50 group-hover:border-[#C9A24B] p-1.5 bg-[#0D0B0A] rounded-[2px] transition-colors duration-300`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[1px]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 94vw, 55vw"
                    className="object-cover photo-warm transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/70 via-transparent to-transparent" />
                </div>
              </div>

              <div className="mt-3.5 flex items-baseline justify-between gap-4">
                <p className="font-serif text-base sm:text-lg text-[#F3EDE2] group-hover:text-[#C9A24B] transition-colors">
                  {photo.caption}
                </p>
                <span className="font-serif text-xs text-[#C9A24B]/75 shrink-0">
                  {photo.jpCaption}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20">
          <SumiBrushDivider dark />
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryPhotos[lightboxIdx].caption}
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-[90] bg-[#0D0B0A]/94 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
              className="self-end mb-3 inline-flex items-center gap-2 px-3 py-1.5 border border-[#C9A24B]/50 text-xs uppercase tracking-[0.2em] text-[#F3EDE2] hover:bg-[#C8161D] hover:border-[#C8161D] rounded-[2px] transition-colors"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-[4/3] max-h-[74vh] border border-[#C9A24B]/60 bg-[#0D0B0A] p-1.5 rounded-[2px]">
              <div className="relative w-full h-full">
                <Image
                  src={galleryPhotos[lightboxIdx].src}
                  alt={galleryPhotos[lightboxIdx].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 w-full flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx(
                    (lightboxIdx - 1 + galleryPhotos.length) %
                      galleryPhotos.length
                  )
                }
                aria-label="Previous photo"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#C9A24B]/40 text-xs uppercase tracking-[0.2em] text-[#F3EDE2] hover:border-[#C9A24B] rounded-[2px]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <p className="font-serif text-sm sm:text-base text-[#F3EDE2] text-center">
                {galleryPhotos[lightboxIdx].caption}
              </p>

              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((lightboxIdx + 1) % galleryPhotos.length)
                }
                aria-label="Next photo"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#C9A24B]/40 text-xs uppercase tracking-[0.2em] text-[#F3EDE2] hover:border-[#C9A24B] rounded-[2px]"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
