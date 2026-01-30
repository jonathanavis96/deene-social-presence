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


- [x] **6.12** BATCH: Fix skills/playbooks/task-optimization-review.md broken links
  - **Scope:** Lines 143-145 (3 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 143: `../domains/code-quality/token-efficiency.md` → `../../brain_upstream/skills/domains/code-quality/token-efficiency.md`
    - Line 144: `../domains/code-quality/testing-patterns.md` → `../../brain_upstream/skills/domains/code-quality/testing-patterns.md`
    - Line 145: `../domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/task-optimization-review.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 3 links)

- [x] **6.13** BATCH: Fix skills/playbooks/debug-ralph-stuck.md broken links
  - **Scope:** Lines 24, 137, 256, 354-356 (6 broken links)
  - **Fix Type:** Point to brain_upstream/ locations (note: line 356 has incorrect relative path)
    - Line 24: `../domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 137: `../domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 256: `../domains/ralph/cache-debugging.md` → `../../brain_upstream/skills/domains/ralph/cache-debugging.md`
    - Line 354: `../domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
    - Line 355: `../domains/ralph/cache-debugging.md` → `../../brain_upstream/skills/domains/ralph/cache-debugging.md`
    - Line 356: `../code-quality/token-efficiency.md` → `../../brain_upstream/skills/domains/code-quality/token-efficiency.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/debug-ralph-stuck.md` passes
  - **Estimated Time:** [M] 3-4 minutes (1 file, 6 links)

- [x] **6.14** BATCH: Fix skills/playbooks/decompose-large-tasks.md broken links
  - **Scope:** Lines 202-204 (3 broken links)
  - **Fix Type:** Point to brain_upstream/ locations (note: line 203 target file doesn't exist)
    - Line 202: `../domains/code-quality/token-efficiency.md` → `../../brain_upstream/skills/domains/code-quality/token-efficiency.md`
    - Line 203: `../../cortex/docs/PROMPT_REFERENCE.md#task-complexity-tags` → `../../brain_upstream/cortex/docs/PROMPT_REFERENCE.md#task-complexity-tags`
    - Line 204: `../domains/ralph/ralph-patterns.md` → `../../brain_upstream/skills/domains/ralph/ralph-patterns.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/decompose-large-tasks.md` passes
  - **Estimated Time:** [S] 2-3 minutes (1 file, 3 links)

- [x] **6.15** BATCH: Fix skills/playbooks/fix-markdown-lint.md broken links
  - **Scope:** Lines 34, 80, 120, 148, 223, 301-304 (9 broken links)
  - **Fix Type:** Point to brain_upstream/ locations
    - Line 34: `../domains/code-quality/markdown-patterns.md` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md`
    - Line 80: `../domains/code-quality/bulk-edit-patterns.md` → `../../brain_upstream/skills/domains/code-quality/bulk-edit-patterns.md`
    - Line 120: `../domains/code-quality/markdown-patterns.md#md040-fenced-code-blocks-should-have-language` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md#md040-fenced-code-blocks-should-have-language`
    - Line 148: `../domains/code-quality/markdown-patterns.md#md024-no-duplicate-headings` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md#md024-no-duplicate-headings`
    - Line 223: `../domains/code-quality/markdown-patterns.md#md060-table-column-style` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md#md060-table-column-style`
    - Line 301: `../domains/code-quality/markdown-patterns.md` → `../../brain_upstream/skills/domains/code-quality/markdown-patterns.md`
    - Line 302: `../domains/code-quality/bulk-edit-patterns.md` → `../../brain_upstream/skills/domains/code-quality/bulk-edit-patterns.md`
    - Line 303: `../domains/code-quality/code-consistency.md` → `../../brain_upstream/skills/domains/code-quality/code-consistency.md`
    - Line 304: `../domains/code-quality/code-hygiene.md` → `../../brain_upstream/skills/domains/code-quality/code-hygiene.md`
  - **AC:** `bash tools/validate_links.sh skills/playbooks/fix-markdown-lint.md` passes
  - **Estimated Time:** [M] 4-5 minutes (1 file, 9 links)

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
