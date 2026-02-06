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

## Phase 1: Move Vite app into `website/` (repo structure cleanup)

- [ ] **1.1** Create `website/` and move the Vite app + configs into it
  - **Goal:** Make the deployable site fully contained under `website/`.
  - **Move these into `website/`** (git mv):
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
    - `bun.lockb` (if present/used; keep in sync with chosen package manager)
  - **Do NOT move**: `.github/`, `cortex/`, `workers/`, `brain/`, `brain_upstream/`, `skills/`, `tools/`, `.verify/`.
  - **AC:**
    - [ ] Tree shows `website/src`, `website/public`, `website/vite.config.ts`, `website/package.json`
    - [ ] Running `npm ci` inside `website/` succeeds
    - [ ] Running `npm run build` inside `website/` produces `website/dist/`
  - **If Blocked:** If `npm ci` fails due to lockfile mismatch, pick one package manager (npm preferred) and ensure lockfiles are consistent (remove unused lockfile only if necessary).

- [ ] **1.2** Fix path assumptions caused by the move (Vite/TS/Tailwind/aliases)
  - **Goal:** Ensure moved config files still point at the right `src/` and build inputs.
  - **Work:**
    - Confirm `website/vite.config.ts` alias `@` still resolves to `website/src` (it should, because it uses `__dirname`).
    - Confirm `website/tailwind.config.ts` content globs include `./src/**/*.{ts,tsx}` etc. relative to `website/`.
    - Confirm TS configs’ `include`/`references` (if any) are correct relative to `website/`.
  - **AC:**
    - [ ] `cd website && npm run build` passes
    - [ ] `cd website && npm run lint` passes
  - **If Blocked:** If ESLint config expects root paths, update it to use `import.meta.dirname` / relative globs, or adjust `eslint` invocation paths.

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
