import type { Metadata } from "next";
import {
  Shippori_Mincho,
  Cormorant_Garamond,
  Zen_Kaku_Gothic_New,
  Inter,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const zen = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Authentic Japanese Ramen Counter in Kalyani`,
  description: siteConfig.description,
  keywords: [
    "Hosshi Ramen",
    "Japanese restaurant Kalyani",
    "Ramen Kalyani West Bengal",
    "Miso Ramen",
    "Shio Ramen",
    "Udon Kalyani",
    "Bento Kalyani",
    "Sushi Kalyani",
  ],
  openGraph: {
    title: `${siteConfig.name} — Modern Wabi-Sabi Ramen Counter`,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    images: [
      {
        url: "/assets/interior-counter.webp",
        width: 1269,
        height: 952,
        alt: "Hosshi Ramen lantern-lit wooden counter interior in Kalyani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Kalyani`,
    description: siteConfig.description,
    images: ["/assets/interior-counter.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    image: "/assets/interior-counter.webp",
    servesCuisine: ["Japanese", "Ramen", "Udon", "Sushi", "Bento"],
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    hasMenu: "#menu",
  };

  return (
    <html
      lang="en"
      className={`${shippori.variable} ${cormorant.variable} ${zen.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0D0B0A] text-[#F3EDE2] selection:bg-[#C8161D] selection:text-[#F3EDE2]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
