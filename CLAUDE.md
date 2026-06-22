# Deene Social

## Overview

Marketing website for Deene Social. Deployed to GitHub Pages and served at the custom domain `deenesocial.com`.

## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS 3 + shadcn/ui (Radix primitives)
- react-router-dom for client-side routing
- Recharts for data visualization
- Formspree for contact form
- GitHub Pages deployment via `.github/workflows/deploy.yml`

## Commands

```bash
cd website
npm run dev          # Vite dev server on :5173
npm run build        # Production build to website/dist
npm run preview      # Preview production build
npm run lint         # ESLint
```

## Architecture

```
website/             # React + Vite SPA (the deliverable)
  src/
    components/      # UI components (sections + shadcn/ui primitives)
    pages/           # Routed pages (Index, NotFound)
    hooks/ lib/ data/
  public/            # Static assets
  tailwind.config.ts
```

Homepage section order lives in `website/src/pages/Index.tsx`. The "Trusted By"
(`ClientLogos`) and "Creative Portfolio" (`Gallery`) sections are currently
commented out there — re-enable by uncommenting their import + element.

## Conventions

- Production base path is `/` (custom domain); override with `VITE_BASE_PATH` for sub-path hosting
- Formspree form ID set via `VITE_FORMSPREE_FORM_ID` env var
- Pre-commit hook: markdownlint
- Uses lovable-tagger dev dependency
