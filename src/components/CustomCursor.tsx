"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "image" | "interactive">("default");

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!ring || !glow) return;

    const xRing = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });
    const xGlow = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power3.out" });
    const yGlow = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xRing(e.clientX);
      yRing(e.clientY);
      xGlow(e.clientX);
      yGlow(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-cursor='image']")) {
        setMode("image");
      } else if (
        target.closest("a, button, [data-magnetic='true'], [role='tab']")
      ) {
        setMode("interactive");
      } else {
        setMode("default");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[80] hidden lg:block transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Lantern glow aura over images */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ${
          mode === "image" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: 112,
          height: 112,
          background:
            "radial-gradient(circle, rgba(255,77,109,0.26) 0%, rgba(201,162,75,0.14) 45%, transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      {/* Crisp ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center ${
          mode === "image"
            ? "w-14 h-14 border-[#FF4D6D]/75 bg-[#FF4D6D]/10"
            : mode === "interactive"
            ? "w-10 h-10 border-[#C9A24B] bg-[#C9A24B]/10"
            : "w-6 h-6 border-[#C9A24B]/70"
        }`}
      >
        {mode === "image" && (
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#F3EDE2]/90">
            View
          </span>
        )}
      </div>
    </div>
  );
}
