# NEURONS - Deene Social Presence

## Project Context

**Project Name:** Deene Social Presence  
**Repository:** deene-social  
**Work Branch:** deene-social-work  
**Tech Stack:** React, TypeScript, Vite, shadcn-ui, Tailwind CSS

## Purpose

A social media presence management website built with modern React and TypeScript, featuring a responsive design with shadcn-ui components.

## Key Components

### Frontend Architecture

- **Framework:** React 18.3 with TypeScript
- **Build Tool:** Vite 5.4
- **UI Library:** shadcn-ui with Radix UI primitives
- **Styling:** Tailwind CSS with custom configuration
- **Routing:** React Router DOM 6.30
- **State Management:** TanStack Query for data fetching

### Main Features

- Hero section with navigation
- Services showcase
- Client logos display
- About section
- Contact functionality
- Responsive design with mobile support

### Components Structure

```text
src/
├── components/
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Services.tsx
│   ├── ClientLogos.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/ (shadcn components)
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── hooks/
    └── use-mobile.tsx
```

## Development Environment

- Node.js with npm package manager
- ESLint for code quality
- TypeScript for type safety
- Vite for fast development and building

## Deployment

- GitHub deployment workflow configured
- Static site build process
- Preview and production builds supported

## Memory Anchors

1. **Component Library**: Using shadcn-ui ensures consistent, accessible UI components
2. **Type Safety**: TypeScript throughout for robust code
3. **Modern Stack**: Vite provides fast HMR and optimized builds
4. **Responsive First**: Mobile-friendly design patterns

## Current State

Project is a working React application with landing page components and navigation structure in place.
