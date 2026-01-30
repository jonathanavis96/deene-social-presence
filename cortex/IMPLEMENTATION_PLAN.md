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


- [ ] **6.8** Fix brain_upstream/skills/domains/infrastructure/observability-patterns.md broken link
  - **Scope:** Line 791 (1 broken link)
  - **Fix Type:** Fix relative path within brain_upstream
    - Line 791: `../../code-quality/testing-patterns.md` → `../code-quality/testing-patterns.md`
  - **AC:** `bash tools/validate_links.sh brain_upstream/skills/domains/infrastructure/observability-patterns.md` passes
  - **Estimated Time:** [S] 1-2 minutes (1 file, 1 link)

- [ ] **6.9** BATCH: Fix skills/playbooks/resolve-verifier-failures.md broken links
  - **Scope:** Lines 87, 104-105, 127, 170, 277-282 (11 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 87: `../domains/code-quality/code-consistency.md` → `../../brain_upstream/skills/domains/code-quality/code-consistency.md`
    - Line 104: `../domains/languages/shell/variable-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 105: `../domains/languages/shell/common-pitfalls.md` → `../../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 127: `../domains/code-quality/markdown-patterns.md` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md`
    - Line 170: `../domains/ralph/change-propagation.md` → `../../brain_upstream/skills/domains/ralph/change-propagation.md`
    - Line 277: `../domains/code-quality/code-consistency.md` → `../../brain_upstream/skills/domains/code-quality/code-consistency.md`
    - Line 278: `../domains/languages/shell/variable-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 279: `../domains/languages/shell/common-pitfalls.md` → `../../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 280: `../domains/code-quality/markdown-patterns.md` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md`
    - Line 281: `../domains/ralph/change-propagation.md` → `../../brain_upstream/skills/domains/ralph/change-propagation.md`
    - Line 282: `../domains/code-quality/code-hygiene.md` → `../../brain_upstream/skills/domains/code-quality/code-hygiene.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/resolve-verifier-failures.md` passes
  - **Estimated Time:** [M] 4-6 minutes (1 file, 11 links)

- [ ] **6.10** BATCH: Fix skills/playbooks/fix-shellcheck-failures.md broken links
  - **Scope:** Lines 85, 100, 117, 131, 145, 236-240 (9 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 85: `../domains/languages/shell/variable-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 100: `../domains/languages/shell/variable-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 117: `../domains/languages/shell/variable-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 131: `../domains/languages/shell/common-pitfalls.md` → `../../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 145: `../domains/languages/shell/common-pitfalls.md` → `../../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 236: `../domains/languages/shell/variable-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/variable-patterns.md`
    - Line 237: `../domains/languages/shell/common-pitfalls.md` → `../../brain_upstream/skills/domains/languages/shell/common-pitfalls.md`
    - Line 238: `../domains/languages/shell/strict-mode.md` → `../../brain_upstream/skills/domains/languages/shell/strict-mode.md`
    - Line 239: `../domains/languages/shell/validation-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/validation-patterns.md`
    - Line 240: `../domains/code-quality/code-hygiene.md` → `../../brain_upstream/skills/domains/code-quality/code-hygiene.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/fix-shellcheck-failures.md` passes
  - **Estimated Time:** [M] 4-6 minutes (1 file, 9 links)

- [ ] **6.11** BATCH: Fix skills/playbooks/safe-template-sync.md broken links
  - **Scope:** Lines 52, 109 (2 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 52: `../domains/ralph/change-propagation.md` → `../../brain_upstream/skills/domains/ralph/change-propagation.md`
    - Line 109: `../domains/languages/shell/validation-patterns.md` → `../../brain_upstream/skills/domains/languages/shell/validation-patterns.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/safe-template-sync.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 2 links)
