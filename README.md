# The Baking Lab — Artisan Bakery Website

Premium website for The Baking Lab, an artisan bakery in Kaldhara Chowk, Thamel, Kathmandu, Nepal. Built with React 18, Vite, Tailwind CSS v3, and Framer Motion.

## Tech Stack

- **React 18** + **Vite** (esbuild minify)
- **Tailwind CSS v3** (dark mode via `class` strategy)
- **Framer Motion** (animations, scroll reveals, loading screen)
- **React Router v6** (client-side routing)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, awards ticker, famous for, reviews, stats |
| Menu | `/menu` | Filterable menu with tabs, dietary toggle |
| Custom Cake | `/custom-cake` | 5-step cake builder with live pricing |
| Pre-Order | `/pre-order` | Quantity steppers, pickup form, WhatsApp order |
| Gallery | `/gallery` | Masonry grid with lightbox, Instagram + Facebook |
| Contact | `/contact` | Info card, Google Maps embed, contact form |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Features

- Loading screen on fresh load only (never on nav clicks)
- Sold Out urgency popup (4s delay, sessionStorage dismissed)
- WhatsApp floating button with pulse ring
- Back to top button (appears after 300px scroll)
- Mobile sticky bottom bar (Build Cake + Pre-Order)
- Dark/light mode toggle (localStorage persistence)
- Smooth scroll reveals with Framer Motion whileInView
- Product card hover effects (translateY + glow shadow)
- Button micro-animations (brightness + scale)
- Google Maps embed with Kaldhara location
- Full SEO with JSON-LD LocalBusiness schema
- Sitemap.xml + robots.txt
- Netlify deployment ready (netlify.toml + _redirects)

## Deployment

The site is configured for Netlify deployment:

1. Push to your Git repository
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. SPA redirects handled via `public/_redirects`

## Color Palette

- Deep Chocolate: `#2C1506`
- Warm Brown: `#3D1F0D`
- Rustic Caramel: `#7B4A1E`
- Honey Gold: `#D4A020`
- Warm Cream: `#FDF6EC`
- Soft Ivory: `#FAF0E0`
- White: `#FFFFFF`
# Thebakinglab
# Thebakinglab
# the-baking-lab-
# the-baking-lab-
# Thebakinglab
