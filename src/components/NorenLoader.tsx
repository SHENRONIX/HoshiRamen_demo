"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export function NorenLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        ".noren-seal-ring",
        { strokeDashoffset: 360 },
        { strokeDashoffset: 0, duration: 0.72, ease: "power2.inOut" }
      )
        .fromTo(
          ".noren-seal-cat",
          { scale: 0.78, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" },
          "-=0.45"
        )
        .fromTo(
          ".noren-seal-label",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        )
        .to(
          ".noren-seal-wrap",
          { opacity: 0, scale: 0.94, duration: 0.28, ease: "power2.in" },
          "+=0.22"
        )
        .to(
          ".noren-panel",
          {
            yPercent: -105,
            duration: 0.85,
            stagger: { amount: 0.18, from: "center" },
            ease: "power3.inOut",
          },
          "-=0.1"
        )
        .to(
          ".noren-overlay",
          { opacity: 0, duration: 0.25, ease: "power1.out" },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className="noren-overlay motion-reduce:hidden fixed inset-0 z-[100] pointer-events-auto flex"
    >
      {/* 4 dark green Japanese noren curtains with white crests */}
      {[0, 1, 2, 3].map((panel) => (
        <div
          key={panel}
          className="noren-panel relative flex-1 h-full bg-[#122119] border-r border-[#0B1510]/80 last:border-r-0 flex flex-col items-center justify-between py-14"
        >
          {/* Top rod sleeve seam */}
          <div className="w-full h-3 bg-[#0C1711] border-b border-[#C9A24B]/20" />
          {/* White kamon / family-style crest on each panel */}
          <div className="flex flex-col items-center gap-3 opacity-85">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#F3EDE2]/65 flex items-center justify-center">
              <div className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-[#F3EDE2]/45 flex items-center justify-center">
                <span className="font-serif text-sm md:text-base text-[#F3EDE2]">
                  {panel === 1 ? "ほ" : panel === 2 ? "し" : "楽"}
                </span>
              </div>
            </div>
            <span className="hidden sm:block text-[10px] tracking-[0.3em] uppercase text-[#F3EDE2]/45">
              Hosshi
            </span>
          </div>
          <div className="w-10 h-px bg-[#C9A24B]/25" />
        </div>
      ))}

      {/* Center Hanko Seal draw-in */}
      <div className="noren-seal-wrap absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full -rotate-90"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="rgba(13,11,10,0.65)"
              stroke="#C8161D"
              strokeWidth="2.5"
              strokeDasharray="360"
              strokeDashoffset="360"
              className="noren-seal-ring"
            />
          </svg>
          <div className="noren-seal-cat relative w-20 h-20 opacity-0">
            <Image
              src="/assets/cat-seal.webp"
              alt=""
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
        <p className="noren-seal-label mt-4 font-serif text-xs tracking-[0.4em] uppercase text-[#F3EDE2]/90 opacity-0">
          ほっし · 一杯入魂
        </p>
      </div>
    </div>
  );
}
