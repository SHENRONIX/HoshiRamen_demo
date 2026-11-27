export interface HoursEntry {
  days: string;
  hours: string;
}

export const siteConfig = {
  name: "Hosshi Ramen",
  jpName: "ほっしラーメン",
  tagline: "Modern Japanese Ramen & Izakaya Counter in Kalyani",
  description:
    "Intimate Tokyo-style ramen counter in Kalyani, West Bengal. Handcrafted miso & shio broths, udon, katsu rice, bento, and maki sushi under warm lantern light.",
  url: "https://hosshiramen.example.com", // TODO: Replace with production domain when deployed

  address: {
    line1: "B-14/256, Block B",
    city: "Kalyani",
    state: "West Bengal",
    postalCode: "741235",
    country: "IN",
    full: "B-14/256, Block B, Kalyani, West Bengal 741235",
  },

  contact: {
    // TODO: Replace with actual restaurant phone number (E.164 format without spaces for tel:)
    phoneDisplay: "+91 98000 00000 (Placeholder)",
    phoneHref: "tel:+919800000000",
    // TODO: Replace with actual WhatsApp business number (country code + number, digits only)
    whatsappNumber: "919800000000",
    whatsappMessage: "Hello Hosshi Ramen! I would like to inquire about a table / order.",
    // TODO: Replace with actual email if available
    email: "hello@hosshiramen.in",
  },

  // TODO: Replace with verified opening hours from owners
  hours: [
    { days: "Tuesday – Friday", hours: "12:30 PM – 10:30 PM (Placeholder)" },
    { days: "Saturday – Sunday", hours: "12:00 PM – 11:00 PM (Placeholder)" },
    { days: "Monday", hours: "Closed (Placeholder)" },
  ] as HoursEntry[],

  social: {
    instagram: "https://www.instagram.com/hosshiramen05/",
    instagramHandle: "@hosshiramen05",
    facebook: "https://www.facebook.com/share/17X1kitnmx/?mibextid=wwXIfr",
  },

  maps: {
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Hosshi+Ramen+B-14/256+Block+B+Kalyani+West+Bengal+741235",
    placeUrl:
      "https://www.google.com/maps/search/?api=1&query=Hosshi+Ramen+B-14/256+Block+B+Kalyani+West+Bengal+741235",
    // TODO: Replace with exact Google Maps Embed API iframe src from Share -> Embed a map
    embedUrl:
      "https://www.google.com/maps?q=B-14/256,+Block+B,+Kalyani,+West+Bengal+741235&output=embed",
  },
} as const;

export function getWhatsAppHref(): string {
  const text = encodeURIComponent(siteConfig.contact.whatsappMessage);
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
}
