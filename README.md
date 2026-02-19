# Vidably Landing Page

Production landing page for Vidably — verified buyer evidence for every product.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with semantic design tokens
- **Fonts**: Poppins (headings), Inter (body) via Google Fonts
- **Testing**: Playwright visual regression tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start development server                     |
| `npm run build`      | Build for production                         |
| `npm run start`      | Start production server                      |
| `npm run lint`       | Run ESLint                                   |
| `npm run test`       | Run Playwright visual regression tests       |
| `npm run test:update`| Update Playwright baseline screenshots       |

## Design Tokens

All design tokens are defined as CSS variables in `src/app/globals.css` and mapped to the Tailwind theme via `@theme inline`. Colors, radii, shadows, and typography are sourced directly from the Figma design system.

## Visual Regression Tests

Tests run across 4 viewport widths:
- **1440px** — Desktop
- **1024px** — Laptop
- **768px** — Tablet
- **390px** — Mobile

Baseline screenshots are stored in `tests/visual-regression.spec.ts-snapshots/`.

## Project Structure

```
src/
  app/
    globals.css        # Design tokens + Tailwind config
    layout.tsx         # Root layout with fonts
    page.tsx           # Landing page composition
  components/
    Header.tsx
    Hero.tsx
    EvidenceCard.tsx
    EvidenceSection.tsx
    ProofSection.tsx
    SignalsSection.tsx
    CollaborativeSection.tsx
    MeasurementSection.tsx
    CTASection.tsx
    SectionHeading.tsx
    Footer.tsx
public/
  images/
    evidence-cards/    # Evidence card photos
    section-images/    # Section background/product images
    icons/             # SVG icons
tests/
  visual-regression.spec.ts
playwright.config.ts
```
