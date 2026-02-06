# AGENTS - Deene Social Presence

## Project-Specific Agent Behaviors

This file defines custom agent behaviors and preferences for the deene-social project.

### Repository Information

- **Repository:** deene-social
- **Work Branch:** deene-social-work
- **Main Branch:** main
- **Workflow:** Development on work branch → PR to main

### Tech Stack Awareness

**Frontend:**

- React 18.3 with TypeScript
- Vite for build tooling
- shadcn-ui component library
- Tailwind CSS for styling
- React Router for navigation

**Development Tools:**

- ESLint for code quality
- TypeScript for type safety
- npm for package management

### Code Style Preferences

1. **TypeScript First**
   - Use TypeScript for all new files
   - Prefer interfaces over types for object shapes
   - Use proper type annotations

2. **Component Structure**
   - Functional components with hooks
   - Props interfaces defined above component
   - Export default at the end of file

3. **Styling**
   - Use Tailwind utility classes
   - Follow shadcn-ui patterns for consistency
   - Responsive design with mobile-first approach

4. **File Organization**
   - Components in `src/components/`
   - UI primitives in `src/components/ui/`
   - Pages in `src/pages/`
   - Hooks in `src/hooks/`
   - Utils in `src/lib/`

### Development Workflow

**Testing:**

- Manual testing in development mode
- Check responsive behavior
- Verify TypeScript compilation

**Building:**

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

**Linting:**

```bash
npm run lint     # Check for issues
```

### Ralph Integration

**Loop Workflow:**

```bash
# Run Ralph from the Brain directory (this repo's /brain/ folder)
cd /path/to/deene-social/brain/workers/ralph
bash loop.sh --iterations 5
```

**PR Generation:**

```bash
cd workers/ralph
bash pr-batch.sh
```

### Validation Criteria

Before marking tasks complete:

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Components render correctly
- [ ] Responsive design works
- [ ] No console errors

### Brain Skills Access

This project has access to the shared brain/skills knowledge base for:

- Best practices and patterns
- Common solutions to problems
- Domain-specific expertise

### Notes

- Keep dependencies up to date
- Monitor bundle size
- Maintain accessibility standards
- Follow React best practices
