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

## Phase 3: Small UX/content alignment and cleanup

- [ ] **3.1** Decide what to do with `src/components/Navigation.tsx` (currently renders null)
  - **Goal:** Avoid confusing dead code and document intent.
  - **AC:**
    - Either remove the component (and references) OR document why it intentionally returns null.
    - Index page remains correct.
  - **If Blocked:** Add a comment in `Navigation.tsx` explaining the design decision and add a follow-up task.

- [ ] **3.2** Add a short “non-obvious behaviors” section to README
  - **Goal:** Capture easy-to-break UI details.
  - **AC:** README notes:
    - Hero “logo lock” / fixed header behavior
    - Base path + routing constraints
    - Contact Formspree configuration
  - **If Blocked:** Put these notes under a “Notes” heading.

---

## Phase 4: Fix broken links in brain_upstream templates (website)

- [ ] **4.1** BATCH: Fix template placeholder links in brain_upstream/templates/website/
  - **Scope:** `VALIDATION_CRITERIA.project.md`, `THOUGHTS.project.md`, `AGENTS.project.md`, `NEURONS.project.md`
  - **Fix:** Update all template file cross-references to point to docs/ subdirectory
    - `[AGENTS.md](AGENTS.md)` → `[AGENTS.md](docs/AGENTS.md)` (or remove if truly placeholder)
    - `[NEURONS.md](NEURONS.md)` → `[NEURONS.md](docs/NEURONS.md)`
    - `[THOUGHTS.md](THOUGHTS.md)` → `[THOUGHTS.md](docs/THOUGHTS.md)`
    - `[VALIDATION_CRITERIA.md](VALIDATION_CRITERIA.md)` → `[VALIDATION_CRITERIA.md](docs/VALIDATION_CRITERIA.md)`
    - `[sitemap.md](sitemap.md)` → `[sitemap.md](docs/sitemap.md)`
    - `[sections.md](sections.md)` → `[sections.md](docs/sections.md)`
  - **Rationale:** Template files are meant to be copied to new projects; links should reflect where docs will exist in instantiated projects
  - **Steps:**
    1. Check each file for link context (are they truly meant as relative links or just placeholders?)
    2. Update all 11 broken links across 4 files
    3. Validate: `bash tools/validate_links.sh brain_upstream/templates/website/`
  - **AC:** All template files pass link validation
  - **Estimated Time:** [M] 5-8 minutes (4 files, 11 links)

---

## Phase 5: Fix broken links in brain_upstream core documentation

- [ ] **5.1** Fix IMPLEMENTATION_PLAN.md reference in brain_upstream/THOUGHTS.md
  - **Goal:** Correct path to implementation plan file
  - **Fix:** Line 263: `[IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)` → `[IMPLEMENTATION_PLAN.md](../workers/IMPLEMENTATION_PLAN.md)`
  - **AC:** `bash tools/validate_links.sh brain_upstream/THOUGHTS.md` passes

- [ ] **5.2** Fix skill doc references in brain_upstream/workers/ralph/THUNK.md
  - **Goal:** Correct relative paths to skills documentation
  - **Fix:**
    - Line 614: `[code-hygiene.md](../code-hygiene.md)` → `[code-hygiene.md](../../skills/domains/code-quality/code-hygiene.md)`
    - Line 614: `[ralph-patterns.md](../ralph-patterns.md)` → `[ralph-patterns.md](../../skills/domains/ralph/ralph-patterns.md)`
    - Line 743: `[text](target.md)` → Remove or replace with valid example
  - **AC:** `bash tools/validate_links.sh brain_upstream/workers/ralph/THUNK.md` passes

- [ ] **5.3** BATCH: Fix broken skill cross-references in brain_upstream/skills/
  - **Scope:** `debug-ralph-stuck.md`, `conventions.md`, `python-patterns.md`, `observability-patterns.md`, `deployment-patterns.md`
  - **Fix:** Update all skill doc references to match current directory structure (11 broken links total)
    - Example: `[Token Efficiency](../code-quality/token-efficiency.md)` → check if file exists, update path
    - Example: `[error-handling-patterns.md](./error-handling-patterns.md)` → verify correct relative path
    - Example: `[testing-patterns.md](../../code-quality/testing-patterns.md)` → verify path exists
  - **Steps:**
    1. Map current brain_upstream/skills/ structure: `find brain_upstream/skills -name "*.md" -type f | head -30`
    2. For each broken link, find correct target path
    3. Update all references
    4. Validate each file after fixing
  - **AC:** All 5 files pass `bash tools/validate_links.sh <file>`
  - **Estimated Time:** [M] 10-15 minutes (5 files, 11 links, need path discovery)

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
