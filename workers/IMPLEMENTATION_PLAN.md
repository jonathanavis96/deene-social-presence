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
