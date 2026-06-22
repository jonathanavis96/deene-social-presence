# Deene Social

Marketing website for Deene Social — built with React, TypeScript, and Vite, styled with Tailwind CSS and shadcn/ui. Deployed to GitHub Pages and served at [deenesocial.com](https://deenesocial.com).

The site lives in `website/`.

## Local development

```bash
cd website

# Install dependencies
npm ci

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

## Available commands

```bash
cd website

npm run dev      # Start development server with hot reload
npm run build    # Build for production (outputs website/dist)
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds `website/`
and publishes it to GitHub Pages. The production base path is `/` (served at the
custom domain `deenesocial.com`); override with the `VITE_BASE_PATH` build variable
if hosting under a sub-path instead.

## Contact form (Formspree)

The contact form posts to [Formspree](https://formspree.io).

1. Create a form and copy its form ID (e.g. `abc123def` from `https://formspree.io/f/abc123def`).
2. Local dev — create `website/.env.local`:

   ```bash
   VITE_FORMSPREE_FORM_ID=your_form_id_here
   ```

3. Deployment — set a repository variable `VITE_FORMSPREE_FORM_ID` in GitHub.
