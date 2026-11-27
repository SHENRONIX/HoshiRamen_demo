import Image from "next/image";
import { getAssetPath, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative bg-[#0D0B0A] text-[#F3EDE2] border-t border-[#C9A24B]/20 pt-16 pb-24 md:pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-12 border-b border-[#C9A24B]/15">
          {/* Wordmark + Small Cat Hanko Seal */}
          <div className="flex items-center gap-5">
            <div className="relative w-14 h-14 rounded-full border border-[#C8161D]/80 p-1 bg-[#1A1613] shrink-0">
              <Image
                src={getAssetPath("/assets/cat-seal.webp")}
                alt="Hosshi Ramen lucky cat emblem"
                width={56}
                height={56}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl tracking-[0.06em] text-[#F3EDE2]">
                Hosshi Ramen
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#C9A24B]">
                ほっし · 一杯入魂 · Kalyani
              </p>
            </div>
          </div>

          {/* Socials & Address */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-xs">
            <div>
              <p className="uppercase tracking-[0.24em] text-[#C9A24B] mb-2">
                Location
              </p>
              <p className="text-[#B8AE9F] leading-relaxed">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state}{" "}
                {siteConfig.address.postalCode}
              </p>
            </div>

            <div>
              <p className="uppercase tracking-[0.24em] text-[#C9A24B] mb-2">
                Follow
              </p>
              <div className="flex flex-col gap-2 text-[#F3EDE2]/85 uppercase tracking-[0.18em]">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline hover:text-[#C9A24B] transition-colors w-fit"
                >
                  Instagram ({siteConfig.social.instagramHandle})
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline hover:text-[#C9A24B] transition-colors w-fit"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9A9083]">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[#C9A24B]/85">Website by Shenronix</p>
        </div>
      </div>
    </footer>
  );
}
