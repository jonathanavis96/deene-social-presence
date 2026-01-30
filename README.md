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

### Contact Form Setup

The contact form uses Formspree for form handling. To configure:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Update `src/components/Contact.tsx` with your form ID:

   ```typescript
   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
   ```

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

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Run `npm run build` to verify production build
5. Submit a pull request

## License

All rights reserved.
