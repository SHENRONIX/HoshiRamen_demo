"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { getWhatsAppHref, siteConfig } from "@/config/site";
import { EnsoCircle, SakuraPetals } from "./JapaneseDecor";
import { MagneticButton } from "./MagneticButton";

export function VisitSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <section
      id="visit"
      className="relative bg-[#0D0B0A] text-[#F3EDE2] seigaiha-dark py-24 sm:py-32 overflow-hidden"
    >
      <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 opacity-60" />
      <SakuraPetals />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Address, Hours, Contact & Action Buttons */}
          <div className="lg:col-span-5 relative">
            <EnsoCircle
              className="absolute -top-10 -left-10 w-44 h-44"
              color="#C9A24B"
              opacity={0.18}
            />

            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#C9A24B] mb-3">
                Visit Us · ご案内
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#F3EDE2]">
                Find the Lanterns in Kalyani
              </h2>

              <div className="mt-9 space-y-7 border-t border-[#C9A24B]/20 pt-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#C9A24B] mb-1">
                      Address
                    </p>
                    <p className="text-base text-[#F3EDE2] leading-relaxed">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.city}, {siteConfig.address.state}{" "}
                      {siteConfig.address.postalCode}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="mt-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A24B] hover:text-[#F3EDE2] transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1E7A3E]" />
                          <span className="text-[#F3EDE2]">Address Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#C9A24B] mb-2">
                      Hours
                    </p>
                    <dl className="space-y-1.5 text-sm">
                      {siteConfig.hours.map((row) => (
                        <div
                          key={row.days}
                          className="flex justify-between gap-4 border-b border-[#C9A24B]/10 pb-1.5"
                        >
                          <dt className="text-[#B8AE9F]">{row.days}</dt>
                          <dd className="text-[#F3EDE2] text-right">
                            {row.hours}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Direct Contact Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <MagneticButton
                    href={siteConfig.contact.phoneHref}
                    className="inline-flex items-center gap-2.5 px-5 py-3 border border-[#C9A24B]/60 hover:border-[#F3EDE2] bg-[#1A1613] text-[#F3EDE2] text-xs uppercase tracking-[0.22em] rounded-[2px] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C9A24B]" />
                    <span>Call Counter</span>
                  </MagneticButton>

                  <MagneticButton
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#C8161D] hover:bg-[#E0242C] text-[#F3EDE2] text-xs uppercase tracking-[0.22em] rounded-[2px] transition-colors shadow-[0_8px_24px_rgba(200,22,29,0.28)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </MagneticButton>
                </div>

                <p className="text-xs text-[#9A9083]">
                  Phone:{" "}
                  <span className="text-[#F3EDE2]/80">
                    {siteConfig.contact.phoneDisplay}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Gold-Framed Lazy Google Map + Directions Actions */}
          <div className="lg:col-span-7">
            <div className="border border-[#C9A24B]/65 p-1.5 bg-[#1A1613] rounded-[2px] shadow-2xl">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[1px] bg-[#14110F]">
                <iframe
                  title="Hosshi Ramen Kalyani Location Map"
                  src={siteConfig.maps.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0 grayscale sepia-[0.35] contrast-110 brightness-90 hover:grayscale-0 hover:sepia-0 hover:brightness-100 transition-all duration-700"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <MagneticButton
                href={siteConfig.maps.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#F3EDE2] hover:bg-[#C9A24B] text-[#0D0B0A] text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </MagneticButton>

              <a
                href={siteConfig.maps.placeUrl}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C9A24B] hover:text-[#F3EDE2] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
