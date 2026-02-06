# Implementation Plan — Deene Social Presence

Last Updated: 2026-02-06 16:40:09

## Execution rules (Ralph)

- Execute **top-to-bottom**.
- In each BUILD iteration, implement **only the first unchecked** item (`- [ ]`) in file order.
- Every item must include:
  - **Goal** (why)
  - **AC** (acceptance criteria; how we know it's done)
  - **If Blocked** (what to do if dependencies are missing)
- **Quality reference:** Before implementing any task, check `skills/` for relevant patterns and best practices:
  - **Frontend work:** See `skills/domains/frontend/` (React patterns, accessibility, component architecture)
  - **Code quality:** See `skills/domains/code-quality/` (testing, code hygiene, markdown patterns)
  - **Shell scripts:** See `skills/domains/languages/shell/` (validation patterns, common pitfalls)
  - **General patterns:** See `skills/playbooks/` for task-specific guidance
  - **Specific guides:**
    - `skills/domains/frontend/react-patterns.md`
    - `skills/domains/code-quality/code-review-patterns.md`
    - `skills/domains/code-quality/code-hygiene.md`
    - `skills/domains/websites/design/spacing-layout.md`
    - `skills/domains/websites/launch/finishing-pass.md`

## Context / Why (source of truth)

This plan maintains and evolves the Deene Social Presence marketing site as a clean, minimal, brand-forward single-page experience (Hero → About → Services → Clients → Contact → Footer) deployed on GitHub Pages.

**Primary objectives (must-have):**

- GitHub Pages correctness under base path `/deene-social-presence/` (Vite base + SPA routing + 404 behavior)
- Contact form production readiness (Formspree configured via env; clear success/error UX)
- No console errors; solid responsive behavior; accessible interactions

**Secondary objectives (nice-to-have / future):**

- Premium visuals (e.g., improved logos, gallery refinements)

---

## Phase 0: Orientation guardrail (must run first)

- [ ] **0.1** Confirm repo root, app root, and deploy base path (orientation guardrail)
  - **Goal:** Prevent wasted iterations by establishing the correct working directory and commands before any implementation work.
  - **AC:**
    - Identify the repo root (this directory) and confirm where the actual web app lives.
      - Repo root contains: `cortex/`, `workers/`, `src/`, etc.
      - App root is `./` for this repo (not `brain_upstream/`)
    - Run and report results (non-interactive):
      - `npm ci` (or `npm install` if needed)
      - `npm run lint`
      - `npm run build`
    - Confirm the deploy base path target: `/deene-social-presence/`.
    - Confirm which file controls base path (e.g., `vite.config.*`).
  - **If Blocked:** If `npm` commands fail due to node version or missing deps, capture the exact error output and identify the required Node/npm version from repo docs or `package.json`.

---

## Phase 1: GitHub Pages routing + contact production readiness

> **Goal:** Ensure the site works correctly under the GitHub Pages base path and contact form can be configured for real submissions.

- [ ] **1.1** Ensure Vite base path and React Router basename work on GitHub Pages
  - **Goal:** Prevent broken asset paths and SPA routing issues when deployed under `/deene-social-presence/`.
  - **AC:**
    - Identify the file that sets Vite base path (e.g., `vite.config.*`) and confirm it uses `/deene-social-presence/`.
    - If React Router is used, ensure routes work under the base path:
      - Direct navigation to `/deene-social-presence/` loads.
      - Refreshing a non-root route does not 404 (or is handled by the chosen GH Pages SPA strategy).
    - Document the chosen approach in a short comment in the relevant config (or in the component/router file): what sets base path, and why.
  - **If Blocked:** If GH Pages SPA refresh support requires a 404.html redirect approach, implement the minimal standard GH Pages SPA workaround.

- [ ] **1.2** Fix 404 / NotFound behavior to respect base path and provide correct "Return Home" navigation
  - **Goal:** Ensure users can recover from bad URLs in production.
  - **AC:**
    - NotFound page renders correctly when hitting an unknown route.
    - "Return Home" navigates to the app root under `/deene-social-presence/` (not `/`).
    - No console errors.
  - **If Blocked:** If route construction is unclear, use React Router helpers (e.g., `useNavigate`, `Link`) and avoid hardcoded absolute paths.

- [ ] **1.3** Make contact form configurable via environment variables (Formspree)
  - **Goal:** Remove placeholders and enable real submissions without code changes.
  - **AC:**
    - Contact component reads Formspree form id (or endpoint) from env (e.g., `VITE_FORMSPREE_FORM_ID`).
    - If env var missing: show a clear non-breaking message in dev (and/or disable submit) rather than failing silently.
    - Update `.env.example` (if present) with the required variable name.
    - `npm run build` passes.
  - **If Blocked:** If Formspree integration is currently hardcoded, refactor minimally to accept an env-configured id.

- [ ] **1.4** Production preview sanity for base path
  - **Goal:** Catch base-path issues before deploying.
  - **AC:**
    - Run `npm run build` and `npm run preview`.
    - Verify the preview works when served with base path expectations (assets load; navigation works).
  - **If Blocked:** Capture the exact broken URLs (assets or routes) and trace back to base/basename configuration.
