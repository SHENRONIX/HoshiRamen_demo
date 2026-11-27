import Image from "next/image";

export function EnsoCircle({
  className = "",
  color = "#C9A24B",
  opacity = 0.22,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <path
        d="M174 58C154 32 122 20 88 26C42 34 14 78 22 124C30 170 74 200 122 192C164 185 194 150 198 108"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeDasharray="2 0"
      />
      <path
        d="M168 50C147 28 116 18 84 25C44 33 18 72 24 114C31 158 72 188 118 184C155 180 184 153 192 118"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function SumiBrushDivider({
  dark = true,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const stroke = dark ? "#C9A24B" : "#1A1613";
  return (
    <div
      aria-hidden="true"
      className={`w-full flex items-center justify-center py-2 ${className}`}
    >
      <svg
        viewBox="0 0 600 22"
        fill="none"
        className="w-full max-w-2xl h-5 opacity-45"
        preserveAspectRatio="none"
      >
        <path
          d="M8 12C95 9 185 15 298 10C410 6 502 14 592 10"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M110 14C205 11 355 14 490 9"
          stroke="#C8161D"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}

export function HankoSeal({
  size = 48,
  showCat = true,
  className = "",
}: {
  size?: number;
  showCat?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border border-[#C8161D]/80 bg-[#0D0B0A]/80 p-1 shadow-[0_0_24px_rgba(200,22,29,0.22)] ${className}`}
      style={{ width: size, height: size }}
    >
      {showCat ? (
        <Image
          src="/assets/cat-seal.webp"
          alt="Hosshi Ramen lucky cat seal"
          width={size}
          height={size}
          className="w-full h-full object-contain rounded-full"
        />
      ) : (
        <span className="font-serif text-xs tracking-widest text-[#C8161D]">
          ほっし
        </span>
      )}
    </div>
  );
}

export function LanternAccents() {
  const lanterns = [
    {
      left: "8%",
      top: "0%",
      delayClass: "animate-lantern-slow",
      scale: "scale-95 md:scale-100",
      cordH: "h-12 md:h-20",
      hideMobile: false,
    },
    {
      left: "21%",
      top: "0%",
      delayClass: "animate-lantern-alt",
      scale: "scale-75 md:scale-90",
      cordH: "h-6 md:h-12",
      hideMobile: true,
    },
    {
      right: "18%",
      top: "0%",
      delayClass: "animate-lantern-alt",
      scale: "scale-75 md:scale-90",
      cordH: "h-8 md:h-14",
      hideMobile: true,
    },
    {
      right: "7%",
      top: "0%",
      delayClass: "animate-lantern-slow",
      scale: "scale-95 md:scale-105",
      cordH: "h-10 md:h-20",
      hideMobile: false,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden h-[340px]"
    >
      {lanterns.map((item, idx) => (
        <div
          key={idx}
          style={{ left: item.left, right: item.right, top: item.top }}
          className={`absolute flex flex-col items-center ${item.delayClass} ${item.scale} ${
            item.hideMobile ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Hanging cord */}
          <div className={`w-px ${item.cordH} bg-gradient-to-b from-black/80 to-[#C9A24B]/50`} />
          {/* Ambient radial lantern glow */}
          <div className="relative flex flex-col items-center">
            <div
              className="absolute -inset-12 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,77,109,0.28) 0%, rgba(200,22,29,0.12) 45%, transparent 72%)",
              }}
            />
            {/* Top cap */}
            <div className="w-6 h-1.5 rounded-t-sm bg-[#120E0C] border border-[#C9A24B]/40" />
            {/* Chochin paper body */}
            <div
              className="relative w-10 h-14 rounded-[45%] border border-[#FF4D6D]/35 overflow-hidden shadow-[0_0_32px_rgba(255,77,109,0.35)]"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(255,155,140,0.88) 0%, rgba(200,22,29,0.82) 55%, rgba(72,10,12,0.92) 100%)",
              }}
            >
              {/* Rib lines */}
              <div className="absolute inset-x-0 top-1/4 h-px bg-black/25" />
              <div className="absolute inset-x-0 top-2/4 h-px bg-black/25" />
              <div className="absolute inset-x-0 top-3/4 h-px bg-black/25" />
              <span className="absolute inset-0 flex items-center justify-center font-serif text-[10px] text-[#0D0B0A]/80 font-semibold writing-vertical">
                ほっし
              </span>
            </div>
            {/* Bottom cap */}
            <div className="w-5 h-1.5 rounded-b-sm bg-[#120E0C] border border-[#C9A24B]/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SakuraPetals({ className = "" }: { className?: string }) {
  const petals = [
    { left: "12%", delay: "0s", duration: "19s", size: 9 },
    { left: "44%", delay: "-6s", duration: "23s", size: 7 },
    { left: "73%", delay: "-11s", duration: "21s", size: 8 },
    { left: "89%", delay: "-3s", duration: "17s", size: 7 },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    >
      {petals.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute -top-6 animate-sakura"
          style={{
            left: p.left,
            width: p.size * 1.4,
            height: p.size * 1.4,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <path
            d="M12 2C15 6 20 9 19 15C18 19 14 21 12 22C10 21 6 19 5 15C4 9 9 6 12 2Z"
            fill="#FF4D6D"
            fillOpacity="0.45"
          />
        </svg>
      ))}
    </div>
  );
}

export function SteamWisps() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden"
    >
      {[
        { left: "18%", delay: "0s" },
        { left: "49%", delay: "-2.5s" },
        { left: "77%", delay: "-4.8s" },
      ].map((wisp, idx) => (
        <svg
          key={idx}
          viewBox="0 0 60 120"
          className="absolute bottom-0 w-14 h-32 animate-steam opacity-0"
          style={{ left: wisp.left, animationDelay: wisp.delay }}
        >
          <path
            d="M30 115C18 92 44 74 28 50C14 28 38 14 30 2"
            fill="none"
            stroke="#F3EDE2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
        </svg>
      ))}
    </div>
  );
}
