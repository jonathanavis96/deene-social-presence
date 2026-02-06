# Deene Social Presence (monorepo)

This repository contains two top-level areas:

- `website/` — the Deene Social Presence marketing site (React + TypeScript + Vite)
- `brain/` — Cortex/Ralph/skills/tools/docs used to plan and operate work in this repo

## Website

### Local development

```bash
cd website

# Install dependencies
npm ci

# Start dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Available commands

```bash
cd website

npm run dev      # Start development server with hot reload
npm run build    # Build for production (outputs website/dist)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

### Deployment (GitHub Pages)

The site is deployed via `.github/workflows/deploy.yml` and builds from `website/`.

The website is configured for GitHub Pages deployment with base path `/deene-social-presence/`.

- Vite config: `website/vite.config.ts`:

  ```ts
  base: "/deene-social-presence/"
  ```

### Contact form setup (Formspree)

1. Sign up at <https://formspree.io>
2. Create a new form and copy your form ID (e.g. `abc123def` from `https://formspree.io/f/abc123def`)
3. Local dev:

   ```bash
   cd website
   cp .env.example .env.local
   ```

   Then edit `website/.env.local`:

   ```bash
   VITE_FORMSPREE_FORM_ID=your_form_id_here
   ```

4. Deployment (GitHub Pages): set a repository variable `VITE_FORMSPREE_FORM_ID`.

## Brain

All planning/agent tooling lives under `brain/`:

- `brain/cortex/`
- `brain/workers/`
- `brain/skills/`
- `brain/tools/`
- `brain/docs/`
- `brain/brain_upstream/`

(See `brain/docs/` for setup notes.)
