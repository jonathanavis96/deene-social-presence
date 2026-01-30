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

- [ ] **6.1** BATCH: Fix cortex/IMPLEMENTATION_PLAN.md broken links
  - **Scope:** Lines 63-65, 71-72
  - **Fix Type:** Point to brain_upstream/ locations (files exist there)
    - Line 63: `../../docs/BOOTSTRAPPING.md` → `../brain_upstream/docs/BOOTSTRAPPING.md`
    - Line 64: `../../skills/domains/ralph/ralph-patterns.md` → `../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 65: `../../skills/domains/ralph/change-propagation.md` → `../brain_upstream/skills/domains/ralph/change-propagation.md`
    - Line 71: `../domains/code-quality/testing-patterns.md` → `../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 72: `../../templates/README.md` → `../brain_upstream/templates/README.md`
  - **AC:** `bash tools/validate_links.sh cortex/IMPLEMENTATION_PLAN.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 5 links)

- [ ] **6.2** BATCH: Fix workers/IMPLEMENTATION_PLAN.md broken links
  - **Scope:** Lines 63-65, 71-72 (identical to cortex/)
  - **Fix Type:** Point to brain_upstream/ locations (files exist there)
    - Line 63: `../../docs/BOOTSTRAPPING.md` → `../brain_upstream/docs/BOOTSTRAPPING.md`
    - Line 64: `../../skills/domains/ralph/ralph-patterns.md` → `../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 65: `../../skills/domains/ralph/change-propagation.md` → `../brain_upstream/skills/domains/ralph/change-propagation.md`
    - Line 71: `../domains/code-quality/testing-patterns.md` → `../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 72: `../../templates/README.md` → `../brain_upstream/templates/README.md`
  - **AC:** `bash tools/validate_links.sh workers/IMPLEMENTATION_PLAN.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 5 links)

- [ ] **6.3** BATCH: Fix workers/ralph/THUNK.md broken links
  - **Scope:** Line 83 (5 broken links in one line)
  - **Fix Type:** Point to brain_upstream/ locations
    - `../code-hygiene.md` → `../../brain_upstream/skills/domains/code-quality/code-hygiene.md`
    - `../../skills/domains/code-quality/code-hygiene.md` → `../../brain_upstream/skills/domains/code-quality/code-hygiene.md`
    - `../ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - `../../skills/domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - `target.md` → Remove or fix (malformed link)
  - **AC:** `bash tools/validate_links.sh workers/ralph/THUNK.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 1 line with 5 links)

- [ ] **6.4** BATCH: Fix workers/ralph/README.md broken links
  - **Scope:** Lines 117-119 (3 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 117: `../../docs/BOOTSTRAPPING.md` → `../../brain_upstream/docs/BOOTSTRAPPING.md`
    - Line 118: `../../skills/domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 119: `../../skills/domains/ralph/change-propagation.md` → `../../brain_upstream/skills/domains/ralph/change-propagation.md`
  - **AC:** `bash tools/validate_links.sh workers/ralph/README.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 3 links)

- [ ] **6.5** BATCH: Fix .verify/plan_snapshot.md broken links
  - **Scope:** Lines 63-65, 71-72 (identical to IMPLEMENTATION_PLAN.md files)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 63: `../../docs/BOOTSTRAPPING.md` → `../brain_upstream/docs/BOOTSTRAPPING.md`
    - Line 64: `../../skills/domains/ralph/ralph-patterns.md` → `../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 65: `../../skills/domains/ralph/change-propagation.md` → `../brain_upstream/skills/domains/ralph/change-propagation.md`
    - Line 71: `../domains/code-quality/testing-patterns.md` → `../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 72: `../../templates/README.md` → `../brain_upstream/templates/README.md`
  - **AC:** `bash tools/validate_links.sh .verify/plan_snapshot.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 5 links)

- [ ] **6.6** BATCH: Fix skills/playbooks/investigate-test-failures.md broken links
  - **Scope:** Lines 109, 213, 263, 320, 358, 447-451 (10 broken links)
  - **Fix Type:** Point to brain_upstream/ locations (most files exist there)
    - Line 109: `../domains/code-quality/testing-patterns.md` → `../../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 213: `../domains/languages/javascript/javascript-patterns.md` → `../../brain_upstream/skills/domains/languages/javascript/javascript-patterns.md`
    - Line 263: `../domains/code-quality/testing-patterns.md` → `../../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 320: `../domains/languages/python/python-patterns.md` → `../../brain_upstream/skills/domains/languages/python/python-patterns.md`
    - Line 358: `../domains/code-quality/testing-patterns.md` → `../../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 447: `../domains/code-quality/testing-patterns.md` → `../../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 448: `../domains/languages/python/python-patterns.md` → `../../brain_upstream/skills/domains/languages/python/python-patterns.md`
    - Line 449: `../domains/languages/javascript/javascript-patterns.md` → `../../brain_upstream/skills/domains/languages/javascript/javascript-patterns.md`
    - Line 450: `../domains/backend/error-handling-patterns.md` → `../../brain_upstream/skills/domains/backend/error-handling-patterns.md`
    - Line 451: `../domains/code-quality/code-hygiene.md` → `../../brain_upstream/skills/domains/code-quality/code-hygiene.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/investigate-test-failures.md` passes
  - **Estimated Time:** [M] 3-5 minutes (1 file, 10 links)

- [ ] **6.7** BATCH: Fix skills/playbooks/bootstrap-new-project.md broken links
  - **Scope:** Lines 67, 203, 302-306 (6 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 67: `../../templates/README.md` → `../../brain_upstream/templates/README.md`
    - Line 203: `../../docs/BOOTSTRAPPING.md` → `../../brain_upstream/docs/BOOTSTRAPPING.md`
    - Line 302: `../../templates/README.md` → `../../brain_upstream/templates/README.md`
    - Line 303: `../../docs/BOOTSTRAPPING.md` → `../../brain_upstream/docs/BOOTSTRAPPING.md`
    - Line 304: `../domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 306: `../domains/infrastructure/deployment-patterns.md` → `../../brain_upstream/skills/domains/infrastructure/deployment-patterns.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/bootstrap-new-project.md` passes
  - **Estimated Time:** [M] 3-5 minutes (1 file, 6 links)

- [ ] **6.8** Fix brain_upstream/skills/domains/infrastructure/observability-patterns.md broken link
  - **Scope:** Line 791 (1 broken link)
  - **Fix Type:** Fix relative path within brain_upstream
    - Line 791: `../../code-quality/testing-patterns.md` → `../code-quality/testing-patterns.md`
  - **AC:** `bash tools/validate_links.sh brain_upstream/skills/domains/infrastructure/observability-patterns.md` passes
  - **Estimated Time:** [S] 1-2 minutes (1 file, 1 link)
