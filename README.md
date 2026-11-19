# Lumière

A premium 4-page e-commerce website for a home & living brand.

**Live demo:** _LIVE_URL_

> Demo data is generated in the browser and saved to `localStorage`, so every visitor gets their own sandbox. Create, edit and delete freely — use **Reset demo data** to start over.

## Features

- Home: editorial hero, shop by room, bestsellers, brand story, testimonials, campaign banner
- Shop: category filters, search, sort, on-sale filter, wishlist, quick-add
- Product: gallery, colour swatches, quantity, tabs for details / care / shipping, related products
- Bag & checkout: promo codes (LUMIERE10, FREESHIP), multi-step checkout (details → delivery → payment) and order confirmation
- Fully responsive with a refined serif + sans type system

## Tech stack

- React 18 + Vite
- Tailwind CSS v4
- React Router
- Recharts (charts) & Lucide (icons)
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build` (outputs to `dist/`).

## Making it production-ready

This demo runs entirely in the browser. For a client project, the same UI connects to a real backend (e.g. Supabase / PostgreSQL + REST or tRPC API), with authentication, role-based permissions and server-side validation.
