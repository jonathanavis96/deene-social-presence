# Deene Social Presence

## Overview

Monorepo containing the Deene Social Presence marketing website and associated planning/agent tooling. Deployed to GitHub Pages.

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
  src/               # Components, pages, hooks, lib
  public/            # Static assets
  tailwind.config.ts
brain/               # Cortex/Ralph agent planning and tooling
  cortex/            # Strategic planning
  workers/           # Task execution (Ralph)
  skills/            # Vendored brain skills
  tools/             # Utility scripts
```

## Conventions

- Base path configured as `/deene-social-presence/` for GitHub Pages
- Formspree form ID set via `VITE_FORMSPREE_FORM_ID` env var
- Pre-commit hooks: markdownlint, ruff (Python linting)
- Uses lovable-tagger dev dependency
