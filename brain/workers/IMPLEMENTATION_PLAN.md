# Implementation Plan — Deene Social Presence

Last Updated: 2026-02-06 11:19:50

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

---

## Phase 5: Apply call checklist updates (site content + UX)

> Source: `brain/cortex/examples/deene-social-call-checklist-filled-2026-01-21-08-03.html`

- [ ] **5.1** Hero/top banner: remove tagline + keep minimal “Deene” block
  - **Goal:** Match agreed direction: clean white hero with the Deene block only.
  - **Work:**
    - Remove the tagline line “Where authenticity leads, conversation follows.” (or equivalent) from the Hero/banner.
    - Ensure layout still looks intentional on mobile + desktop after removal.
  - **AC:**
    - [ ] Hero renders with no tagline/subheading text
    - [ ] No obvious spacing regressions on mobile + desktop
  - **If Blocked:** If unsure which string is canonical, search for the tagline text across `website/src/` and remove where used.

- [ ] **5.2** Navigation: remove “Clients” from nav (keep one-page scroll)
  - **Goal:** Match call decision: “Clients” removed from the navigation.
  - **AC:**
    - [ ] No “Clients” item in the main nav
    - [ ] Remaining nav links still scroll correctly
  - **If Blocked:** If section IDs are coupled to nav generation, remove only the nav item (not the section) unless specifically requested.

- [ ] **5.3** Services section: rename heading to “Services” (remove “Intentionally Crafted”)
  - **Goal:** Use literal naming per call notes.
  - **AC:**
    - [ ] Services section heading reads “Services”
    - [ ] No remaining “Intentionally Crafted” heading text
  - **If Blocked:** If there are multiple occurrences (e.g. on cards + section header), update all places that represent the section title.

- [ ] **5.4** “Created” gallery: update category labels to agreed abbreviations
  - **Goal:** Reflect agreed categories while staying mostly visual.
  - **Target labels:** Coffee x2; Restaurants; Accommodation; Wine bars; Products; Wine Estates
  - **AC:**
    - [ ] Category labels match the target list (spelling/case consistent)
    - [ ] Gallery remains scroll-only (no new click-throughs) unless it already supports click-to-advance
  - **If Blocked:** If the gallery is currently fully label-free, add labels in the smallest/quietest way possible (e.g., visually subtle caption) and confirm in review.

- [ ] **5.5** Client logos strip: add small “Trusted by” label (above logos)
  - **Goal:** Add the “Trusted by” micro-label above the scrolling client logos strip.
  - **AC:**
    - [ ] “Trusted by” appears above the logos strip
    - [ ] Label styling is subtle (doesn’t compete with hero headings)
  - **If Blocked:** If there is no logos section heading currently, ensure this label is the only heading (per call notes “no heading” except “Trusted by”).

- [ ] **5.6** Contact section: add WhatsApp button + show email address
  - **Goal:** Provide two clear contact options: form (if present) + WhatsApp, and show email visibly.
  - **Details:**
    - WhatsApp: +27 78 881 9656
    - Email: alex@deenesocial.com
  - **AC:**
    - [ ] WhatsApp button exists and opens `https://wa.me/27788819656` (or equivalent)
    - [ ] Email address `alex@deenesocial.com` is visible in the contact section
    - [ ] No console errors
  - **If Blocked:** If WhatsApp link format is unclear, use `https://wa.me/27788819656` (international format, no spaces/dashes).

---

## Phase 6: Asset preparation (mock logos, gallery photos, About copy)

> **Context:** We now have `brain/cortex/examples/brand-doc.pdf` with sample photos organized by category (coffee/FVC, coffee/KZ, wine/salt river, menu/wellington). Contact details confirmed: WhatsApp +27 78 881 9656, email alex@deenesocial.com. Timing: ASAP. Site hosted on GitHub Pages.

- [ ] **6.1** Create ~15 mock client logos for scroll animation testing
  - **Goal:** Have enough logo assets to test the scrolling client logos strip with realistic density.
  - **Work:**
    - Generate 15 minimal SVG logos (simple geometric shapes or text-based placeholders)
    - Use a consistent style (e.g., monochrome, minimal, geometric) that feels brand-appropriate
    - Save as `website/public/logos/logo-01.svg` through `logo-15.svg`
  - **AC:**
    - [ ] 15 SVG files exist in `website/public/logos/`
    - [ ] Each logo is under 5KB and visually distinct
    - [ ] Logos render cleanly in browser (no broken SVG syntax)
  - **If Blocked:** If SVG generation is difficult, use simple text-based SVGs (company initials in a circle) or export from a tool like Figma/Canva.

- [ ] **6.2** Extract photos from brand-doc.pdf for gallery
  - **Goal:** Populate the "Created" gallery with real photos from the brand doc.
  - **Categories identified:** coffee/FVC, coffee/KZ, wine/salt river, menu/wellington
  - **Work:**
    - Extract images from `brain/cortex/examples/brand-doc.pdf` (pages 1-4)
    - Save to `website/public/gallery/` with category-based naming (e.g., `coffee-fvc-01.jpg`, `wine-saltriver-01.jpg`)
    - Optimize for web (max width 1200px, quality 80%)
  - **AC:**
    - [ ] At least 12 images extracted and saved in `website/public/gallery/`
    - [ ] Images are web-optimized (each under 300KB)
    - [ ] Filenames clearly indicate category
  - **If Blocked:** If PDF extraction is difficult, use a tool like `pdfimages` (CLI) or `pdf.js` (JS) or manually screenshot and crop. Prioritize quality over quantity (at least 8 images is acceptable).

- [ ] **6.3** Draft first-person About section copy
  - **Goal:** Write provisional About copy in first-person voice to replace placeholder text.
  - **Tone:** Authentic, conversational, confident but not arrogant. Reflect Deene's brand personality (see checklist notes: "Where authenticity leads, conversation follows").
  - **Work:**
    - Write 2-3 paragraphs (~150-200 words total)
    - Focus on: who Deene is, what they do, why they do it, and what makes their approach unique
    - Use "I" or "we" (first-person voice)
  - **AC:**
    - [ ] About copy is written and saved (either directly in `website/src/components/About.tsx` or in a draft file `brain/cortex/about-copy-draft.md`)
    - [ ] Copy is first-person voice
    - [ ] Copy is 150-250 words
  - **If Blocked:** If unsure of brand positioning, use the checklist context (authenticity, conversation, intentional/crafted) as thematic anchors. Keep it simple and human.

---

## Deployment & Timing Notes

- **Hosting:** Site is deployed on **GitHub Pages** at `https://{username}.github.io/deene-social-presence/`
- **Timing:** **ASAP** (per user direction)
- **Base path:** Configured in `website/vite.config.ts` as `/deene-social-presence/`

---

## Still Waiting on Alex (final polish only)

These items can be refined later after the site is live (not blockers for ASAP launch):

1. **Final client logos** (real SVGs/PNGs to replace mocks)
2. **Services wording refinements** (copy polish under service headings)
3. **Brand styling references** (detailed typography/spacing rules if needed for final polish)
