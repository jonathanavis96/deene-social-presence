# Implementation Plan — Deene Social Presence

Last Updated: 2026-01-30 16:52:00

## Execution rules (Ralph)

- Execute **top-to-bottom**.
- In each BUILD iteration, implement **only the first unchecked** item (`- [ ]`) in file order.
- Every item must include:
  - **Goal** (why)
  - **AC** (acceptance criteria; how we know it’s done)
  - **If Blocked** (what to do if dependencies are missing)

## Context / Why (source of truth)

We want to de-contaminate the deployable website from the repo’s agent/ops scaffolding (`cortex/`, `workers/`, `brain_upstream/`, etc.). The website should be fully self-contained under `website/`.

**User decisions:**

- Dev/build commands will be run from inside `website/` (no need for root-level delegating scripts).
- Keep a small root `README.md` explaining repo layout, plus a `website/README.md` for site setup.
- Move site-only config files into `website/` so the site is self-contained.

**Non-goals:**

- Do not refactor UI/UX, routing strategy, or features unless required to keep build/deploy working.

---

## Phase 0: Fix Broken Internal Links

- [x] **0.1** Fix broken link in skills/conventions.md
  - **Goal:** Remove or correct the placeholder link at line 204
  - **Work:**
    - Open `skills/conventions.md` line 204
    - The link `[link](../path/to/file.md)` is a placeholder/example that should be removed or made concrete
    - Either remove the example or replace with a valid link (e.g., to `index.md`)
  - **AC:** `bash tools/validate_links.sh skills/conventions.md` passes
  - **If Blocked:** If this is an intentional example, wrap it in a code block instead of using actual markdown link syntax

- [x] **0.2** BATCH: Sync missing backend domain files from brain_upstream
  - **Goal:** Copy backend pattern files that skills/index.md references but don't exist locally
  - **Scope:** 6 files in `skills/domains/backend/`
  - **Work:**
    - Create directory: `mkdir -p skills/domains/backend`
    - Copy files from `brain_upstream/skills/domains/backend/` to `skills/domains/backend/`:
      - `api-design-patterns.md`
      - `auth-patterns.md`
      - `caching-patterns.md`
      - `config-patterns.md`
      - `database-patterns.md`
      - `error-handling-patterns.md`
  - **AC:** All 6 files exist in `skills/domains/backend/` and `bash tools/validate_links.sh skills/index.md` shows no backend link errors
  - **If Blocked:** If files don't exist in brain_upstream, create stub files with basic structure per skills/conventions.md

- [x] **0.3** BATCH: Sync missing code-quality domain files from brain_upstream
  - **Goal:** Copy code-quality pattern files that skills/index.md references but don't exist locally
  - **Scope:** 10 files in `skills/domains/code-quality/`
  - **Work:**
    - Create directory: `mkdir -p skills/domains/code-quality`
    - Copy files from `brain_upstream/skills/domains/code-quality/` to `skills/domains/code-quality/`:
      - `bulk-edit-patterns.md`
      - `code-consistency.md`
      - `code-hygiene.md`
      - `code-review-patterns.md`
      - `markdown-patterns.md`
      - `research-cheatsheet.md`
      - `research-patterns.md`
      - `test-coverage-patterns.md`
      - `testing-patterns.md`
      - `token-efficiency.md`
  - **AC:** All 10 files exist in `skills/domains/code-quality/` and `bash tools/validate_links.sh skills/index.md` shows no code-quality link errors
  - **If Blocked:** If files don't exist in brain_upstream, create stub files with basic structure per skills/conventions.md

- [x] **0.4** BATCH: Sync missing anti-patterns domain files from brain_upstream
  - **Goal:** Copy anti-pattern files that skills/index.md references but don't exist locally
  - **Scope:** 5 files in `skills/domains/anti-patterns/`
  - **Work:**
    - Create directory: `mkdir -p skills/domains/anti-patterns`
    - Copy files from `brain_upstream/skills/domains/anti-patterns/` to `skills/domains/anti-patterns/`:
      - `README.md`
      - `documentation-anti-patterns.md`
      - `markdown-anti-patterns.md`
      - `ralph-anti-patterns.md`
      - `shell-anti-patterns.md`
  - **AC:** All 5 files exist in `skills/domains/anti-patterns/` and `bash tools/validate_links.sh skills/index.md` shows no anti-patterns link errors
  - **If Blocked:** If files don't exist in brain_upstream, create stub files with basic structure per skills/conventions.md

- [ ] **0.5** BATCH: Sync missing frontend domain files from brain_upstream
  - **Goal:** Copy frontend pattern files that skills/index.md references but don't exist locally
  - **Scope:** 3 files in `skills/domains/frontend/`
  - **Work:**
    - Create directory: `mkdir -p skills/domains/frontend`
    - Copy files from `brain_upstream/skills/domains/frontend/` to `skills/domains/frontend/`:
      - `README.md`
      - `react-patterns.md`
      - `accessibility-patterns.md`
  - **AC:** All 3 files exist in `skills/domains/frontend/` and `bash tools/validate_links.sh skills/index.md` shows no frontend link errors
  - **If Blocked:** If files don't exist in brain_upstream, create stub files with basic structure per skills/conventions.md

- [ ] **0.6** BATCH: Sync missing infrastructure domain files from brain_upstream
  - **Goal:** Copy infrastructure pattern files that skills/index.md references but don't exist locally
  - **Scope:** 6 files in `skills/domains/infrastructure/`
  - **Work:**
    - Create directory: `mkdir -p skills/domains/infrastructure`
    - Copy files from `brain_upstream/skills/domains/infrastructure/` to `skills/domains/infrastructure/`:
      - `agent-observability-patterns.md`
      - `deployment-patterns.md`
      - `disaster-recovery-patterns.md`
      - `observability-patterns.md`
      - `security-patterns.md`
      - `state-management-patterns.md`
  - **AC:** All 6 files exist in `skills/domains/infrastructure/` and `bash tools/validate_links.sh skills/index.md` shows no infrastructure link errors
  - **If Blocked:** If files don't exist in brain_upstream, create stub files with basic structure per skills/conventions.md

- [ ] **0.7** BATCH: Sync missing language-specific domain files from brain_upstream
  - **Goal:** Copy language pattern files that skills/index.md references but don't exist locally
  - **Scope:** Multiple subdirectories under `skills/domains/languages/`
  - **Work:**
    - Create directories: `mkdir -p skills/domains/languages/{go,javascript,python}`
    - Copy Go files from `brain_upstream/skills/domains/languages/go/`:
      - `README.md`
      - `go-patterns.md`
    - Copy JavaScript files from `brain_upstream/skills/domains/languages/javascript/`:
      - `README.md`
      - `javascript-patterns.md`
    - Copy Python file from `brain_upstream/skills/domains/languages/python/`:
      - `python-patterns.md`
    - Copy Shell files from `brain_upstream/skills/domains/languages/shell/` (if missing):
      - `cleanup-patterns.md`
      - `common-pitfalls.md`
      - `strict-mode.md`
  - **AC:** All language pattern files exist and `bash tools/validate_links.sh skills/index.md` shows no language link errors
  - **If Blocked:** If files don't exist in brain_upstream, create stub files with basic structure per skills/conventions.md

- [ ] **0.8** Create missing domains/README.md
  - **Goal:** Fix the broken link to domains/README.md in skills/index.md
  - **Work:**
    - Create `skills/domains/README.md` with overview of domain categories
    - Include sections: Backend, Code Quality, Anti-Patterns, Frontend, Infrastructure, Languages
    - Follow structure from skills/conventions.md (Why, When, Details, Examples)
  - **AC:** `bash tools/validate_links.sh skills/index.md` passes for domains/README.md link
  - **If Blocked:** Copy from `brain_upstream/skills/domains/README.md` if it exists

- [ ] **0.9** Verify all broken links are fixed
  - **Goal:** Confirm all link validation passes
  - **Work:**
    - Run: `bash tools/validate_links.sh skills/conventions.md`
    - Run: `bash tools/validate_links.sh skills/index.md`
    - Fix any remaining broken links discovered
  - **AC:** Both files pass validation with no `[ERROR]` lines
  - **If Blocked:** If new errors appear, address them individually or request human review

---

## Phase 1: Repo structure cleanup (split into `website/` + `brain/`)

> **Target layout:**
>
> - `website/` = the Vite/React app (run `npm` commands from here)
> - `brain/` = all brain-related content (cortex/workers/skills/tools/docs/.verify/NEURONS)
> - Keep `.github/` at repo root

- [ ] **1.1** Pre-flight: get to a clean working tree before any `git mv`
  - **Goal:** Avoid losing changes during large moves.
  - **Work:**
    - Run: `git status --short`
    - If there are uncommitted changes, either commit them or `git stash -u`.
  - **AC:** `git status --short` shows clean working tree
  - **If Blocked:** If you must keep local-only changes, stash them and re-apply after the move.

- [ ] **1.2** Create `website/` and move the Vite app + configs into it
  - **Goal:** Make the deployable site fully contained under `website/`.
  - **Work:**
    - Create folder: `mkdir -p website`
    - **Move these into `website/`** (use `git mv`):
      - `src/`
      - `public/`
      - `index.html`
      - `vite.config.ts`
      - `postcss.config.js`
      - `tailwind.config.ts`
      - `components.json`
      - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
      - `eslint.config.js`
      - `.env.example`
      - `package.json`
      - `package-lock.json`
      - `bun.lockb`
  - **AC:**
    - [ ] Tree shows `website/src`, `website/public`, `website/vite.config.ts`, `website/package.json`
    - [ ] `cd website && npm ci` succeeds
    - [ ] `cd website && npm run build` produces `website/dist/`
  - **If Blocked:** If `npm ci` fails due to lockfile mismatch, prefer npm and ensure `website/package-lock.json` matches `website/package.json`.

- [ ] **1.3** Move brain-related content under `brain/`
  - **Goal:** Make brain tooling/docs self-contained under `brain/`.
  - **Work:**
    - Confirm `brain/` exists (it is currently empty)
    - **Move these into `brain/`** (use `git mv`):
      - `brain_upstream/` → `brain/brain_upstream/`
      - `cortex/` → `brain/cortex/`
      - `workers/` → `brain/workers/`
      - `skills/` → `brain/skills/`
      - `tools/` → `brain/tools/`
      - `docs/` → `brain/docs/`
      - `.verify/` → `brain/.verify/`
      - `NEURONS.md` → `brain/NEURONS.md`
  - **AC:**
    - [ ] `brain/brain_upstream/` exists and contains the upstream content
    - [ ] `brain/cortex/`, `brain/workers/`, `brain/skills/`, `brain/tools/`, `brain/docs/` exist
    - [ ] No remaining top-level `brain_upstream/`, `cortex/`, `workers/`, `skills/`, `tools/`, `docs/`, `.verify/`, `NEURONS.md`
  - **If Blocked:** If `brain/` has unexpected contents, pause and confirm what should be preserved.

- [ ] **1.4** Fix path assumptions caused by the move (website configs + any root-relative paths)
  - **Goal:** Ensure moved config files still point at the right inputs and tooling works when run from `website/`.
  - **Work:**
    - Confirm `website/vite.config.ts` alias `@` resolves to `website/src`.
    - Confirm `website/tailwind.config.ts` content globs are correct relative to `website/`.
    - Confirm TS configs still reference the right files relative to `website/`.
  - **AC:**
    - [ ] `cd website && npm run build` passes
    - [ ] `cd website && npm run lint` passes
  - **If Blocked:** If ESLint/TS expects repo-root paths, adjust config globs/paths to be relative to `website/`.

---

## Phase 2: Update GitHub Pages workflow for `website/`

- [ ] **2.1** Update `.github/workflows/deploy.yml` to build from `website/` and upload `website/dist`
  - **Goal:** Keep GitHub Pages deploy working after moving the site.
  - **Work:**
    - Set `defaults.run.working-directory: website` OR set `working-directory: website` per step.
    - Update npm cache dependency path to `website/package-lock.json`.
    - Ensure build output listing uses `ls -la dist` (inside website) or `ls -la website/dist` (depending on working-directory approach).
    - Ensure Pages artifact uploads the correct directory (`website/dist` or `dist` if working-directory is set).
    - Keep the SPA fallback step (copy `index.html` to `404.html`) operating on the correct dist folder.
  - **AC:**
    - [ ] Workflow YAML is valid
    - [ ] Local build still works: `cd website && npm run build`
    - [ ] The workflow would upload the correct folder (visually verify paths in YAML)
  - **If Blocked:** If unsure about working-directory semantics, prefer explicit paths (`website/...`) for clarity.

---

## Phase 3: Documentation updates (root + website)

- [ ] **3.1** Split docs: root `README.md` becomes repo-level; add `website/README.md` for site setup
  - **Goal:** Make it obvious how to run the site and what the other folders are.
  - **Work:**
    - Update root `README.md`:
      - Explain repo layout (`website/` contains the site; `cortex/` + `workers/` are agent ops)
      - Update dev instructions to `cd website` first.
      - Keep GitHub Pages notes, but point to `website/vite.config.ts`.
    - Create `website/README.md`:
      - Setup + dev + build instructions
      - Mention base path `/deene-social-presence/` lives in `website/vite.config.ts`
  - **AC:**
    - [ ] Root README no longer implies `npm install` at repo root
    - [ ] `website/README.md` exists and is accurate
  - **If Blocked:** If you find duplicate/contradictory info, prefer `website/README.md` as the site source-of-truth, and keep root README short.

---

## Phase 4: Sanity checks

- [ ] **4.1** Verify end-to-end locally: build + preview
  - **Goal:** Confirm the moved site still runs and routing/assets work under base path.
  - **Steps:**
    - `cd website && npm ci`
    - `cd website && npm run build`
    - `cd website && npm run preview` (smoke test in browser)
  - **AC:**
    - [ ] No build errors
    - [ ] Home page renders
    - [ ] No obvious missing assets (favicon/images)
  - **If Blocked:** If preview routing fails due to base path, confirm `base` in `website/vite.config.ts` is still `/deene-social-presence/`.
