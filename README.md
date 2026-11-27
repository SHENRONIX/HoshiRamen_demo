# Hosshi Ramen — Website (Kalyani, West Bengal)

Pitch demo & modern Japanese editorial website for **Hosshi Ramen** (`B-14/256, Block B, Kalyani, West Bengal 741235`). Built with Next.js App Router, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, and Lenis smooth scrolling, configured for static export (`output: "export"`).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build the static export (`out/`):

```bash
npm run build
```

## How to Customize Content

### 1. Contact, Hours & Google Maps (`src/config/site.ts`)
Open `src/config/site.ts` and replace the marked `// TODO:` placeholders:
- `contact.phoneDisplay` & `contact.phoneHref` (`tel:+91...`)
- `contact.whatsappNumber` (digits only with country code, e.g. `9198XXXXXXXX`)
- `hours` array (opening days and timings)
- `maps.embedUrl` (paste the exact `src` URL from Google Maps → *Share* → *Embed a map*)

### 2. Menu Items, Prices & Dietary Flags (`src/data/menu.json`)
Edit `src/data/menu.json`:
- Categories live under `categories[]` (`ramen`, `udon`, `rice`, `bento`, `sushi`, `starters`, `salad`, `dessert`, `add-ons`).
- Each dish supports `price` or `variants` (e.g. `M` / `L`, `4 pcs` / `Large`, `Regular` / `Large`), `secondaryVariants` (for Veg/Non-Veg ramen splits), `dietary` (`"veg"`, `"non-veg"`, or `"both"`), and an optional `image` path for the desktop hover preview.
- Look for `"todo"` notes inside `src/data/menu.json` for prices or dietary classifications that were partially unreadable on the reference menu photos (such as Chicken Katsu Rice, Tempura Onigiri, Hosshi Miso Vanilla, and Veg/Non-Veg ramen variants).
- `signatureBowls[]` controls the 6 featured dishes in the horizontal Signature Bowls showcase.

### 3. Photos & Brand Seal (`public/assets/`)
All images are stored locally under `public/assets/` in optimized WebP/PNG format:
- `public/assets/cat-seal.webp` & `src/app/icon.png` — Lucky cat seal emblem & favicon.
- `public/assets/interior-counter.webp`, `wall-decor.webp`, `lantern-glow.webp`, `shelf-maneki.webp` — Restaurant interior photography.
- `public/assets/dishes/` — Dish images (`miso-ramen.webp`, `shio-ramen.webp`, `tantanmen.webp`, `chicken-katsu-rice.webp`, plus editorial placeholders `curry-udon.webp`, `tempura-onigiri.webp`, `bento-box.webp`, `maki-sushi.webp` ready to swap with real restaurant dish photos).
