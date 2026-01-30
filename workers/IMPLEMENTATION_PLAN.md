# Implementation Plan — Deene Social Presence

Last Updated: 2026-01-30 14:05:00

## Execution rules (Ralph)

- Execute **top-to-bottom**.
- In each BUILD iteration, implement **only the first unchecked** item (`- [ ]`) in file order.
- Every item must include:
  - **Goal** (why)
  - **AC** (acceptance criteria; how we know it’s done)
  - **If Blocked** (what to do if dependencies are missing)

## Project reality (source of truth)

- This repo is a **static marketing site** for Deene Social Presence.
- **Stack:** React + TypeScript + Vite + Tailwind + shadcn-ui.
- **Deployment:** GitHub Pages under the base path `/deene-social-presence/`.
  - `vite.config.ts` sets `base: "/deene-social-presence/"`.
  - `src/App.tsx` routes `"/deene-social-presence"` to `<Index />`.
- **Site IA:** Single-page sections:
  - Hero (with fixed/locked header behavior)
  - About
  - Services
  - Clients
  - Contact (Formspree)
  - Footer

## Mandatory references

Repo files:

- `vite.config.ts`
- `src/App.tsx`
- `src/pages/Index.tsx`
- `src/pages/NotFound.tsx`
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Services.tsx`
- `src/components/ClientLogos.tsx`
- `src/components/Contact.tsx`
- `README.md`
- `docs/BRAIN_SETUP.md`
- `docs/SETUP_COMPLETE.md`

Brain skills (open only if relevant to the current item):

- Frontend:
  - `skills/domains/frontend/react-patterns.md`
  - `skills/domains/frontend/accessibility-patterns.md`
- Websites:
  - `skills/domains/websites/architecture/section-composer.md`
  - `skills/domains/websites/design/spacing-layout.md`
  - `skills/domains/marketing/seo/seo-audit.md`

---

## Phase 6: Fix broken links in workers/ralph and local skills/

- [ ] **6.1** Fix relative path references in workers/ralph/README.md
  - **Goal:** Update paths to work from project root structure
  - **Fix:** Lines 117-119:
    - `[docs/BOOTSTRAPPING.md](../../docs/BOOTSTRAPPING.md)` → Check if brain_upstream/docs/BOOTSTRAPPING.md exists, update accordingly
    - `[skills/domains/ralph/ralph-patterns.md](../../skills/domains/ralph/ralph-patterns.md)` → Update to `../../brain_upstream/skills/domains/ralph/ralph-patterns.md` or local equivalent
    - `[skills/domains/ralph/change-propagation.md](../../skills/domains/ralph/change-propagation.md)` → Update to `../../brain_upstream/skills/domains/ralph/change-propagation.md` or local equivalent
  - **AC:** `bash tools/validate_links.sh workers/ralph/README.md` passes

- [ ] **6.2** BATCH: Fix broken skill references in local skills/playbooks/
  - **Scope:** `investigate-test-failures.md`, `bootstrap-new-project.md`
  - **Fix:** Update 5 broken links to match local skills/ structure
    - Example: `[Testing Patterns](../domains/code-quality/testing-patterns.md)` → verify file exists or update path
    - Example: `[Project Template Structure](../../templates/README.md)` → verify path or point to brain_upstream equivalent
  - **Steps:**
    1. Check local skills/ structure: `find skills -name "*.md" -type f`
    2. For missing files, check if they exist in brain_upstream/skills/ instead
    3. Update paths to point to correct location (local or brain_upstream)
    4. Validate both files
  - **AC:** Both files pass `bash tools/validate_links.sh <file>`
  - **Estimated Time:** [S] 3-5 minutes (2 files, 5 links)
