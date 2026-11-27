"use client";

import { MessageCircle, Phone } from "lucide-react";
import { getWhatsAppHref, siteConfig } from "@/config/site";

export function FloatingMobileCta() {
  return (
    <div
      aria-label="Quick Contact Actions"
      className="fixed bottom-4 right-4 z-40 md:hidden flex items-center gap-2.5"
    >
      <a
        href={siteConfig.contact.phoneHref}
        aria-label="Call Hosshi Ramen"
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1A1613]/95 border border-[#C9A24B]/70 text-[#F3EDE2] shadow-xl backdrop-blur-md active:scale-95 transition-transform"
      >
        <Phone className="w-5 h-5 text-[#C9A24B]" />
      </a>
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Hosshi Ramen on WhatsApp"
        className="inline-flex items-center gap-2 px-4 h-12 rounded-full bg-[#C8161D] text-[#F3EDE2] text-xs uppercase tracking-[0.2em] font-medium shadow-[0_8px_24px_rgba(200,22,29,0.45)] active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
