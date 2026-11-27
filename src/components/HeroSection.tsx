"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnsoCircle, LanternAccents, SakuraPetals } from "./JapaneseDecor";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Slow cinematic Ken Burns zoom on hero background
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1.0, duration: 16, ease: "power1.out" }
      );

      // Masked line-by-line hero reveal
      gsap.fromTo(
        ".hero-reveal-line",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.14,
          delay: 0.55,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-fade-in",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          delay: 0.9,
          ease: "power2.out",
        }
      );

      // Subtle parallax on scroll
      if (window.innerWidth >= 768) {
        gsap.to(bgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLElement>,
    selector: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (!el) return;
    if (window.__hosshiLenis) {
      window.__hosshiLenis.scrollTo(el as HTMLElement, { offset: -64 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0D0B0A] flex items-center justify-center"
    >
      {/* Full-bleed interior counter photograph with slow zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/assets/interior-counter.webp"
          alt="Hosshi Ramen wooden counter dining room illuminated by glowing red lanterns in Kalyani"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center photo-warm"
        />
      </div>

      {/* Atmospheric dark vignette + warm lantern glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0D0B0A]/85 via-[#0D0B0A]/55 to-[#0D0B0A]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,77,109,0.14) 0%, rgba(13,11,10,0.45) 48%, rgba(13,11,10,0.88) 100%)",
        }}
      />

      {/* Film grain overlay */}
      <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 opacity-65" />

      {/* Gently swaying lantern accents & drifting sakura */}
      <LanternAccents />
      <SakuraPetals />

      {/* Vertical Japanese calligraphy accent on left/right */}
      <div
        aria-hidden="true"
        className="hidden sm:flex flex-col items-center gap-4 absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 text-[#C9A24B]/70"
      >
        <div className="w-px h-12 bg-[#C9A24B]/35" />
        <span className="writing-vertical font-serif text-sm tracking-[0.45em] select-none">
          ほっし · ラーメン
        </span>
        <div className="w-px h-12 bg-[#C9A24B]/35" />
      </div>

      <div
        aria-hidden="true"
        className="hidden sm:flex flex-col items-center gap-4 absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 text-[#F3EDE2]/55"
      >
        <div className="w-px h-12 bg-[#C9A24B]/35" />
        <span className="writing-vertical font-serif text-sm tracking-[0.45em] select-none">
          一杯入魂
        </span>
        <div className="w-px h-12 bg-[#C9A24B]/35" />
      </div>

      {/* Main Centered Editorial Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center pt-20 pb-24 flex flex-col items-center">
        {/* Enso brush circle behind headline */}
        <EnsoCircle
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[56%] w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          color="#C9A24B"
          opacity={0.18}
        />

        <p className="hero-fade-in text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#C9A24B] mb-5">
          Kalyani · West Bengal · Est. Block B
        </p>

        <h1 className="font-serif font-normal text-[#F3EDE2] leading-[0.95] tracking-[-0.015em]">
          <span className="block overflow-hidden pb-1">
            <span className="hero-reveal-line block text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[6.5rem]">
              Hosshi
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="hero-reveal-line block font-display italic text-[2.95rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] text-[#F3EDE2]/95">
              Ramen
            </span>
          </span>
        </h1>

        <p className="hero-fade-in mt-6 max-w-lg text-sm sm:text-base text-[#F3EDE2]/78 leading-relaxed font-light">
          Warm lantern light, quiet wooden counters, and bowls crafted with
          soul — Japanese comfort dining in the heart of Kalyani.
        </p>

        {/* Action Buttons */}
        <div className="hero-fade-in mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <MagneticButton
            href="#menu"
            onClick={(e) => scrollToSection(e, "#menu")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#C8161D] hover:bg-[#E0242C] text-[#F3EDE2] text-xs uppercase tracking-[0.25em] font-medium rounded-[2px] shadow-[0_10px_32px_rgba(200,22,29,0.35)] transition-colors"
          >
            <span>View Menu</span>
            <span className="font-serif text-sm opacity-90">献立</span>
          </MagneticButton>

          <MagneticButton
            href="#visit"
            onClick={(e) => scrollToSection(e, "#visit")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#C9A24B]/65 hover:border-[#F3EDE2] bg-[#0D0B0A]/55 hover:bg-[#1A1613] text-[#F3EDE2] text-xs uppercase tracking-[0.25em] rounded-[2px] transition-colors"
          >
            <span>Reserve / Visit Us</span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#story"
        onClick={(e) => scrollToSection(e, "#story")}
        aria-label="Scroll to our story"
        className="hero-fade-in absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#F3EDE2]/65 hover:text-[#C9A24B] transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[#C9A24B] to-transparent animate-pulse" />
      </a>
    </section>
  );
}
