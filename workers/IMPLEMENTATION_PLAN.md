# Implementation Plan — Deene Social Presence

Last Updated: 2026-01-30 16:27:00

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






- [ ] **6.16** BATCH: Fix skills/SUMMARY.md broken links
  - **Scope:** Lines 12-18, 27-33, 42-44 (18 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Lines 12-15: `domains/languages/shell/variable-patterns.md` → `../brain_upstream/skills/domains/languages/shell/variable-patterns.md` (4 occurrences)
    - Line 16: `domains/code-quality/markdown-patterns.md` → `../brain_upstream/skills/domains/code-quality/markdown-patterns.md`
    - Line 17-18: `domains/code-quality/code-consistency.md` → `../brain_upstream/skills/domains/code-quality/code-consistency.md` (2 occurrences)
    - Line 27: `domains/languages/shell/common-pitfalls.md` → `../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 28: `domains/languages/shell/variable-patterns.md` → `../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 28: `domains/languages/shell/strict-mode.md` → `../brain_upstream/skills/domains/languages/shell/strict-mode.md`
    - Line 29: `domains/languages/python/python-patterns.md` → `../brain_upstream/skills/domains/languages/python/python-patterns.md`
    - Line 30: `domains/backend/error-handling-patterns.md` → `../brain_upstream/skills/domains/backend/error-handling-patterns.md`
    - Line 30: `domains/backend/api-design-patterns.md` → `../brain_upstream/skills/domains/backend/api-design-patterns.md`
    - Line 31: `domains/infrastructure/deployment-patterns.md` → `../brain_upstream/skills/domains/infrastructure/deployment-patterns.md`
    - Line 32: `domains/backend/config-patterns.md` → `../brain_upstream/skills/domains/backend/config-patterns.md`
    - Line 33: `domains/code-quality/testing-patterns.md` → `../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 42: `domains/languages/shell/validation-patterns.md` → `../brain_upstream/skills/domains/languages/shell/validation-patterns.md`
    - Line 43: `domains/languages/shell/common-pitfalls.md` → `../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 44: `domains/languages/shell/variable-patterns.md` → `../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
  - **AC:** `bash tools/validate_links.sh skills/SUMMARY.md` passes
  - **Estimated Time:** [M] 5-6 minutes (1 file, 18 links)
