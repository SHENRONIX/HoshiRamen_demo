"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "./MagneticButton";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Bowls", href: "#bowls" },
  { label: "Menu", href: "#menu" },
  { label: "The Space", href: "#space" },
  { label: "Visit Us", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if (window.__hosshiLenis) {
          window.__hosshiLenis.scrollTo(target as HTMLElement, { offset: -64 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0B0A]/92 backdrop-blur-md border-b border-[#C9A24B]/20 py-3"
            : "bg-gradient-to-b from-[#0D0B0A]/80 via-[#0D0B0A]/35 to-transparent py-4 md:py-5"
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between"
        >
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded-sm"
          >
            <div className="relative w-9 h-9 rounded-full border border-[#C8161D]/75 p-0.5 bg-[#0D0B0A] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/cat-seal.webp"
                alt="Hosshi Ramen cat seal"
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.16em] uppercase text-[#F3EDE2] leading-none">
                Hosshi
              </span>
              <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A24B] mt-1">
                ほっし · Kalyani
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="link-underline text-xs uppercase tracking-[0.22em] text-[#F3EDE2]/85 hover:text-[#F3EDE2] transition-colors focus-visible:outline-none focus-visible:text-[#C9A24B]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <MagneticButton
              href="#menu"
              onClick={(e) => handleLinkClick(e as React.MouseEvent<HTMLAnchorElement>, "#menu")}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.22em] border border-[#C9A24B]/55 text-[#F3EDE2] hover:border-[#C8161D] hover:bg-[#C8161D] transition-colors rounded-[2px]"
            >
              <span>Menu</span>
              <span className="text-[#C9A24B] group-hover:text-[#F3EDE2]">·</span>
              <span className="font-serif">献立</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-[#C9A24B]/35 bg-[#0D0B0A]/65 text-[#F3EDE2] rounded-[2px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 md:hidden bg-[#0D0B0A] seigaiha-dark transition-all duration-500 flex flex-col justify-between px-7 pt-28 pb-10 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Vertical JP motif */}
        <span
          aria-hidden="true"
          className="writing-vertical absolute right-6 top-28 font-serif text-2xl tracking-[0.4em] text-[#C9A24B]/25 select-none"
        >
          ほっし · 一杯入魂
        </span>

        <ul className="space-y-6">
          {navLinks.map((link, idx) => (
            <li
              key={link.href}
              style={{
                transitionDelay: mobileOpen ? `${idx * 65 + 80}ms` : "0ms",
              }}
              className={`transition-all duration-500 ${
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-baseline gap-4 group"
              >
                <span className="text-xs font-mono text-[#C9A24B]/70">
                  0{idx + 1}
                </span>
                <span className="font-serif text-3xl tracking-wide text-[#F3EDE2] group-hover:text-[#C8161D] transition-colors">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#C9A24B]/20 pt-6 space-y-3 text-xs text-[#9A9083]">
          <p className="uppercase tracking-[0.2em] text-[#C9A24B]">
            {siteConfig.address.line1}, {siteConfig.address.city}
          </p>
          <div className="flex items-center gap-6 text-[#F3EDE2]/80 uppercase tracking-[0.18em]">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
