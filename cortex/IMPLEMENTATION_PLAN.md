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
  - `brain/skills/domains/frontend/react-patterns.md`
  - `brain/skills/domains/frontend/accessibility-patterns.md`
- Websites:
  - `brain/skills/domains/websites/architecture/section-composer.md`
  - `brain/skills/domains/websites/design/spacing-layout.md`
  - `brain/skills/domains/marketing/seo/seo-audit.md`

---

## Phase 0: Align docs/contracts to the real project (HIGH PRIORITY)


- [ ] **0.3** Update `workers/ralph/PROMPT.md` commit policy: do NOT commit in BUILD
  - **Goal:** Enforce the desired workflow: BUILD implements changes, PLAN performs the commit.
  - **AC:**
    - BUILD completion instructions do not require committing.
    - PLAN completion instructions clearly require committing after updating plan + THUNK.
    - Any other files that contradict this are updated (or explicitly documented as legacy).
  - **If Blocked:** Add a short “Commit Policy” section and mark other conflicting instructions as deprecated.

- [ ] **0.4** Update `workers/ralph/VALIDATION_CRITERIA.md` and remove `[PROJECT_NAME]` placeholders
  - **Goal:** Ensure quality gates are project-specific and runnable.
  - **AC:**
    - Title references “Deene Social Presence”.
    - Includes the actual commands used in this repo:
      - `npm run lint`
      - `npm run build`
      - `npm run preview` (optional)
  - **If Blocked:** Keep criteria minimal (lint + build) and add a follow-up task for optional checks.

- [ ] **0.5** Rewrite root `README.md` to remove Lovable boilerplate and document the actual site
  - **Goal:** Make the repo understandable without Lovable references.
  - **AC:** README includes:
    - What the site is (Deene Social Presence landing page)
    - Local dev commands (`npm i`, `npm run dev`, `npm run build`, `npm run preview`)
    - GitHub Pages base path details (`/deene-social-presence/`)
    - Contact form setup notes (Formspree)
  - **If Blocked:** Provide a minimal README and add TODO bullets for missing details.

- [ ] **0.6** Clarify “monitoring tools” in `docs/BRAIN_SETUP.md` / `docs/SETUP_COMPLETE.md`
  - **Goal:** Keep monitors as human-only utilities and ensure agents don’t run interactive scripts.
  - **AC:**
    - Docs explicitly say: humans may run `current_ralph_tasks.sh` / `thunk_ralph_tasks.sh`, but Cortex/Ralph agents should avoid interactive scripts.
    - Timestamp formatting is consistent where practical.
  - **If Blocked:** Add a short note under “Monitoring Tools” stating the policy.

- [ ] **0.7** Update `cortex/AGENTS.md` to be Deene Social Presence–specific (remove placeholders)
  - **Goal:** Make Cortex guidance reflect this repo’s actual project and prevent outdated/template behaviors.
  - **AC:**
    - No `{{PROJECT_NAME}}`, `{{PROJECT_PURPOSE}}`, or `{{TECH_STACK}}` placeholders remain.
    - Replace project-specific context with:
      - Project: `Deene Social Presence`
      - Purpose: static marketing site / landing page
      - Tech stack: React + TypeScript + Vite + Tailwind + shadcn-ui + React Router
    - Remove or rewrite any example tasks that refer to unrelated backends (e.g., FastAPI/JWT).
  - **If Blocked:** Keep the file’s structure but replace placeholders and add a short “Project-Specific Context” section only.

- [ ] **0.8** Update `cortex/CORTEX_SYSTEM_PROMPT.md` to be Deene Social Presence–specific + fix THUNK path typo
  - **Goal:** Ensure Cortex prompt aligns with the repo, and remove known incorrect references.
  - **AC:**
    - No `{{PROJECT_NAME}}`, `{{PROJECT_PURPOSE}}`, or `{{TIMESTAMP}}` placeholders remain.
    - Fix the incorrect THUNK path string:
      - Replace `workers/ralph/workers/ralph/THUNK.md` with `workers/ralph/THUNK.md` wherever it appears.
    - Ensure the “Project” metadata at the bottom is real:
      - Project: `Deene Social Presence`
      - Last updated: uses seconds (`YYYY-MM-DD HH:MM:SS`).
  - **If Blocked:** At minimum, fix the THUNK path typo and replace placeholders in headings/identity sections.

- [ ] **0.9** Update `cortex/GAP_CAPTURE.md` header and format to reference Deene Social Presence
  - **Goal:** Make gap capture entries unambiguous for this project.
  - **AC:**
    - Header reads: `# Gap Capture - Deene Social Presence`
    - The template “Project:” line uses `Deene Social Presence` (not `PROJECT_NAME`).
    - Timestamp format guidance remains consistent with seconds standard where applicable.
  - **If Blocked:** Only update the header + template “Project:” line.

- [ ] **0.10** Update `cortex/IMPLEMENTATION_PLAN.md` so it is not a bootstrapped template
  - **Goal:** Make Cortex’s view of the plan match the Deene Social mission (even if Ralph primarily uses `workers/IMPLEMENTATION_PLAN.md`).
  - **AC:**
    - No `{{PROJECT_NAME}}`, `{{PROJECT_PURPOSE}}`, or `{{TIMESTAMP}}` placeholders remain.
    - Mission/purpose reflects the real site:
      - single-page marketing site deployed on GitHub Pages under `/deene-social-presence/`.
    - Remove or rewrite any tasks that reference unrelated infrastructure (e.g., “produce `.verify/latest.txt`”).
    - Ensure any suggested tasks point to real files and real commands (`npm run build`, `npm run lint`).
  - **If Blocked:** Minimal acceptable: replace placeholders + delete the fake bootstrap tasks section.

- [ ] **0.11** Fix Ralph loop scripts that still assume the plan is at repo root (`IMPLEMENTATION_PLAN.md`)
  - **Goal:** Eliminate the startup error: `Error: IMPLEMENTATION_PLAN.md not found at <repo>/IMPLEMENTATION_PLAN.md`.
  - **Context:** This repo’s canonical plan is `workers/IMPLEMENTATION_PLAN.md`, but some Ralph infrastructure scripts still hard-code `$ROOT/IMPLEMENTATION_PLAN.md`.
  - **AC:**
    - `workers/ralph/cleanup_plan.sh` uses `PLAN_FILE="${REPO_ROOT}/workers/IMPLEMENTATION_PLAN.md"`.
    - `workers/ralph/loop.sh` uses `workers/IMPLEMENTATION_PLAN.md` consistently for:
      - plan cleanup pre-PLAN (`cleanup_plan.sh`)
      - plan snapshot / drift detection
      - “all tasks done” check
      - scoped staging default plan path (should stage `workers/IMPLEMENTATION_PLAN.md`, not root)
    - `workers/ralph/render_ac_status.sh` uses `PLAN_FILE="${SCRIPT_DIR}/../IMPLEMENTATION_PLAN.md"` (or otherwise correctly targets `workers/IMPLEMENTATION_PLAN.md`).
    - Running `bash loop.sh --iterations 1 --plan-every 1` no longer prints a plan-not-found error.
  - **If Blocked:** As a short-term workaround, create a root `IMPLEMENTATION_PLAN.md` that clearly redirects humans to `workers/IMPLEMENTATION_PLAN.md`, but still fix scripts in a follow-up.

---

## Phase 1: Website correctness for GitHub Pages (routing + assets)

- [ ] **1.1** Verify and fix 404 “Return to Home” behavior under GitHub Pages base path
  - **Goal:** Ensure navigation works when hosted at `/deene-social-presence/`.
  - **AC:**
    - `src/pages/NotFound.tsx` returns the user to the real home route under base path.
    - Works with `npm run build` + `npm run preview`.
  - **If Blocked:** Replace hard-coded `/` with `import.meta.env.BASE_URL` and document why.

- [ ] **1.2** Document (and keep consistent) the routing/base-path strategy
  - **Goal:** Prevent regressions where the app works locally but breaks on GH Pages.
  - **AC:**
    - README documents the relationship between `vite.config.ts` base and `src/App.tsx` routes.
    - Any future route additions follow the documented rule.
  - **If Blocked:** Add a short “Deployment notes” section to README only.

---

## Phase 2: Contact form (Formspree) correctness and configuration

- [ ] **2.1** Make Contact form configurable (Formspree) without committing the form id
  - **Goal:** Keep contact functional when configured, while ensuring the Formspree form id is not committed to git.
  - **AC:**
    - `src/components/Contact.tsx` uses `import.meta.env.VITE_FORMSPREE_FORM_ID` and posts to `https://formspree.io/f/<id>`.
    - If `VITE_FORMSPREE_FORM_ID` is missing/empty:
      - Submit is disabled, and
      - A small note is displayed: “Contact form not configured yet”.
    - If `VITE_FORMSPREE_FORM_ID` is present, submission works normally.
    - `README.md` documents how to set `VITE_FORMSPREE_FORM_ID` locally (e.g., `.env.local`) and in deployment.
  - **If Blocked:** Keep the placeholder URL but block submission unless the placeholder is replaced.

- [ ] **2.2** Validate contact success/error UX and ensure no console errors
  - **Goal:** Preserve a polished brand impression.
  - **AC:**
    - Success message shown only on successful submission.
    - Error message shown on failure.
    - No React warnings or console errors in normal use.
  - **If Blocked:** Keep existing UX and add a follow-up task for deeper validation.

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
