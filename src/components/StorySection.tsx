"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnsoCircle, HankoSeal, SumiBrushDivider } from "./JapaneseDecor";
import { getAssetPath } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-clip-img",
        { clipPath: "inset(14% 0% 14% 0%)", opacity: 0.25 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.05,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      if (window.innerWidth >= 768) {
        gsap.to(".story-parallax-back", {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".story-parallax-front", {
          y: 22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-[#F3EDE2] text-[#1A1613] seigaiha-light py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          {/* Left Column: Editorial Story Copy */}
          <div className="lg:col-span-6 relative">
            <EnsoCircle
              className="absolute -top-10 -left-10 w-52 h-52 sm:w-64 sm:h-64"
              color="#C9A24B"
              opacity={0.22}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] uppercase tracking-[0.34em] text-[#8E6F2B] font-medium">
                  Philosophy · 哲学
                </span>
                <span className="h-px w-12 bg-[#C9A24B]/60" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.18] text-[#1A1613] tracking-[-0.01em]">
                Every bowl is an unhurried ritual — warm broth, honest craft,
                quiet company.
              </h2>

              {/* Placeholder brand story — edit directly to match owners' story */}
              <div className="mt-7 space-y-4 text-sm sm:text-[15px] leading-[1.85] text-[#3F3830] max-w-xl">
                <p>
                  Tucked inside Kalyani&apos;s Block B, Hosshi Ramen brings the
                  intimate rhythm of a late-night Tokyo ramen-ya to West
                  Bengal. Along our glowing wooden counter, steaming bowls of
                  miso and shio ramen meet crispy katsu, hand-rolled maki, and
                  slow-simmered curry udon.
                </p>
                <p className="text-[#5E5449]">
                  Guided by{" "}
                  <span className="italic font-serif text-[#1A1613]">
                    ichigo-ichie
                  </span>{" "}
                  — treasuring every gathering — our kitchen pairs authentic
                  Japanese comfort recipes with warm local hospitality.
                </p>
              </div>

              {/* Editorial Stats / Craft Pillars */}
              <div className="mt-10 pt-8 border-t border-[#1A1613]/15 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E6F2B]">
                    Kitchen
                  </p>
                  <p className="mt-1.5 font-serif text-base text-[#1A1613]">
                    Ramen · Bento
                  </p>
                  <p className="text-xs text-[#5E5449]">Udon · Sushi · Starters</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E6F2B]">
                    Atmosphere
                  </p>
                  <p className="mt-1.5 font-serif text-base text-[#1A1613]">
                    Lantern Counter
                  </p>
                  <p className="text-xs text-[#5E5449]">Intimate wooden seating</p>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                  <HankoSeal size={44} />
                  <div>
                    <p className="font-serif text-sm text-[#1A1613]">一杯入魂</p>
                    <p className="text-[11px] text-[#5E5449]">
                      Soul in every bowl
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Asymmetrical Photo Pair */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg pb-12 sm:pb-16">
              {/* Back tall frame */}
              <div
                data-cursor="image"
                className="story-clip-img story-parallax-back relative ml-auto w-[82%] aspect-[4/5] border border-[#C9A24B]/65 p-1.5 bg-[#E8E0D1] rounded-[2px] shadow-xl"
              >
                <div className="relative w-full h-full overflow-hidden rounded-[1px]">
                  <Image
                    src={getAssetPath("/assets/shelf-maneki.webp")}
                    alt="Maneki-neko lucky cat, ceramic teapot, and chopsticks displayed at Hosshi Ramen"
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover photo-warm"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/35 via-transparent to-transparent" />
                </div>
              </div>

              {/* Front overlapping lantern frame */}
              <div
                data-cursor="image"
                className="story-clip-img story-parallax-front absolute left-0 bottom-0 w-[52%] aspect-[3/4] border border-[#C9A24B] p-1.5 bg-[#1A1613] rounded-[2px] shadow-2xl"
              >
                <div className="relative w-full h-full overflow-hidden rounded-[1px]">
                  <Image
                    src={getAssetPath("/assets/lantern-glow.webp")}
                    alt="Warm red glowing Japanese chochin lantern inside Hosshi Ramen"
                    fill
                    sizes="(max-width: 1024px) 48vw, 260px"
                    className="object-cover photo-warm"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/45 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SumiBrushDivider dark={false} />
        </div>
      </div>
    </section>
  );
}
