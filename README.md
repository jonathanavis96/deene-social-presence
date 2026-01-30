# Deene Social Presence

A professional landing page and social presence website for Deene, built with React, TypeScript, and modern web technologies.

## About This Site

This is a static marketing site showcasing Deene's services, expertise, and contact information. The site features:

- Hero section with call-to-action
- Services overview
- About section
- Client logos
- Contact form
- Responsive design optimized for all devices

## Local Development

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd deene-social-presence

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

## Technology Stack

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - Component library
- **React Router** - Client-side routing

## Deployment

This site is configured for GitHub Pages deployment with the base path `/deene-social-presence/`.

### GitHub Pages Configuration

The `vite.config.ts` includes:

```typescript
base: "/deene-social-presence/"
```

This ensures all assets and routes work correctly when deployed to GitHub Pages.

### Routing and Base Path Strategy

**Important:** The base path must be consistent across three locations:

1. **`vite.config.ts`** - Sets the base path for asset bundling:

   ```typescript
   base: "/deene-social-presence/"
   ```

2. **`src/App.tsx`** - Defines routes with the same base path:

   ```tsx
   <Route path="/deene-social-presence" element={<Index />} />
   ```

3. **Any internal links** - Must use the full path including base (or use `import.meta.env.BASE_URL`):

   ```tsx
   <a href="/deene-social-presence">Home</a>
   // OR
   <a href={import.meta.env.BASE_URL}>Home</a>
   ```

**Why this matters:**

- Locally (`npm run dev`): Works because Vite serves from the base path
- Production (`npm run build` + GitHub Pages): Assets and routes resolve correctly
- If paths mismatch: App works locally but breaks on GitHub Pages (404s, broken assets)

**When adding new routes:**

- Always prefix with `/deene-social-presence` in `src/App.tsx`
- Or use relative navigation with React Router's `<Link>` component (recommended)
- Test with `npm run build && npm run preview` to verify production behavior

### Contact Form Setup

The contact form uses Formspree for form handling. To configure:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and copy your form ID (e.g., `abc123def` from `https://formspree.io/f/abc123def`)
3. **Local Development:** Create a `.env.local` file in the project root:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and set your form ID:

   ```bash
   VITE_FORMSPREE_FORM_ID=your_form_id_here
   ```

4. **Deployment (GitHub Pages):** Set the environment variable in your repository settings:
   - Go to Settings → Secrets and variables → Actions
   - Add a new repository variable: `VITE_FORMSPREE_FORM_ID` with your form ID
   - Update `.github/workflows/deploy.yml` to include the environment variable in the build step

**Note:** The contact form will display "Contact form not configured yet" and the submit button will be disabled until `VITE_FORMSPREE_FORM_ID` is configured. The `.env.local` file is gitignored to prevent committing your form ID.

## Project Structure

```text
src/
├── components/       # React components
│   ├── ui/          # shadcn-ui primitives
│   ├── Hero.tsx     # Hero section
│   ├── About.tsx    # About section
│   ├── Services.tsx # Services overview
│   ├── Contact.tsx  # Contact form
│   └── ...
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── main.tsx         # Application entry point
```

## Non-Obvious Behaviors

This section documents UI details that are easy to break if you're not aware:

- **Hero "logo lock" / fixed header behavior**: The hero section has specific positioning that maintains the logo placement during scroll
- **Base path + routing constraints**: The site uses React Router with specific base path configuration for deployment
- **Contact form (Formspree)**: The contact form uses Formspree for submissions - configuration requires the Formspree endpoint to be set correctly in the Contact component

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Run `npm run build` to verify production build
5. Submit a pull request

## License

All rights reserved.
