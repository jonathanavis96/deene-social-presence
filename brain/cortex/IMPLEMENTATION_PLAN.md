# Implementation Plan — Deene Social Presence

Last Updated: 2026-02-06 12:01:18

## Execution rules (Ralph)

- Execute **top-to-bottom**.
- In each BUILD iteration, implement **only the first unchecked** item (`- [ ]`) in file order.
- Every item must include:
  - **Goal** (why)
  - **AC** (acceptance criteria; how we know it’s done)
  - **If Blocked** (what to do if dependencies are missing)
- **Quality reference:** Before implementing any task, check `/brain/skills/` for relevant patterns and best practices:
  - **Frontend work:** See `/brain/skills/domains/frontend/` (React patterns, accessibility, component architecture)
  - **Code quality:** See `/brain/skills/domains/code-quality/` (testing, code hygiene, markdown patterns)
  - **Shell scripts:** See `/brain/skills/domains/languages/shell/` (validation patterns, common pitfalls)
  - **General patterns:** See `/brain/skills/playbooks/` for task-specific guidance
  - **Specific guides:**
    - `brain/skills/domains/frontend/react-patterns.md`
    - `brain/skills/domains/code-quality/code-review-patterns.md`
    - `brain/skills/domains/code-quality/code-hygiene.md`

## Context / Why (source of truth)

We want to de-contaminate the deployable website from the repo’s agent/ops scaffolding (`cortex/`, `workers/`, `brain_upstream/`, etc.). The website should be fully self-contained under `website/`.

**Note:** Phases 0–4 completed the repo cleanup. **Phase 5+ is post-cleanup content + UX updates** for the live marketing site.

**User decisions:**

- Dev/build commands will be run from inside `website/` (no need for root-level delegating scripts).
- Keep a small root `README.md` explaining repo layout, plus a `website/README.md` for site setup.
- Move site-only config files into `website/` so the site is self-contained.

**Non-goals:**

- Do not refactor UI/UX, routing strategy, or features unless required to keep build/deploy working.

---

## Phase 0-Warn: Verifier Warnings (Markdown Lint)

> **Priority:** Fix before continuing with Phase 5+ feature work.

- [ ] **0.W.5** Fix MD041 (first line not H1) in README.md
  - **Issue:** First line is `<div align="center">` instead of a heading
  - **Fix:** Add `<!-- markdownlint-disable MD041 -->` at top of file (HTML div is intentional for centering)
  - **AC:** `markdownlint README.md` passes (no MD041 errors)
  - **Estimated Time:** [S] 1 minute

- [ ] **0.W.6** Fix MD051 (invalid link fragment) in README.md
  - **Issue:** Link to `[Contributing](#contributing)` at line 25, but no matching `## Contributing` section
  - **Fix:** Either add `## Contributing` section or update link to point to CONTRIBUTING.md file
  - **AC:** `markdownlint README.md` passes (no MD051 errors)
  - **Estimated Time:** [S] 2-3 minutes

- [ ] **0.W.7** BATCH: Fix MD036 (emphasis as heading) in README.md
  - **Scope:** 3 occurrences at lines 85, 129, 164 (e.g., `**Time: ~2 minutes**`)
  - **Fix:** Convert bold text to proper subheadings or plain text depending on context
  - **AC:** `markdownlint README.md` passes (no MD036 errors)
  - **Estimated Time:** [S] 3-4 minutes

---

## Phase 0-Links: Broken Internal Links

> **Priority:** Fix before continuing with Phase 5+ feature work.

- [ ] **0.L.1** Copy missing markdown files from brain_upstream/ to local workspace
  - **Missing Files:**
    - `THOUGHTS.md` (root level)
    - `CONTRIBUTING.md` (root level)
    - `docs/BOOTSTRAPPING.md`
    - `docs/events.md`
    - `docs/CODERABBIT_ISSUES_TRACKER.md`
  - **Work:** Copy files from `brain_upstream/` to corresponding paths in local workspace
  - **AC:** All 5 files exist and `bash tools/validate_links.sh AGENTS.md README.md` shows fewer broken links
  - **Estimated Time:** [S] 2-3 minutes

- [ ] **0.L.2** Create cortex/docs/ directory and copy RUNBOOK.md
  - **Work:**
    1. Create `cortex/docs/` directory
    2. Copy `brain_upstream/cortex/docs/RUNBOOK.md` to `cortex/docs/RUNBOOK.md`
  - **AC:** `ls cortex/docs/RUNBOOK.md` succeeds
  - **Estimated Time:** [S] 1 minute

- [ ] **0.L.3** Copy tools documentation from brain_upstream/
  - **Missing Files:**
    - `tools/gap_radar/README.md`
    - `tools/rollflow_analyze/README.md`
  - **Work:** Copy both README files from `brain_upstream/tools/` to corresponding local paths
  - **AC:** Both files exist and `bash tools/validate_links.sh docs/TOOLS.md docs/MARKER_SCHEMA.md` passes
  - **Estimated Time:** [S] 1-2 minutes

- [ ] **0.L.4** Fix broken links in AGENTS.md and README.md
  - **Affected Files:**
    - `AGENTS.md` (2 broken links to THOUGHTS.md and docs/BOOTSTRAPPING.md)
    - `README.md` (6 broken links to CONTRIBUTING.md, THOUGHTS.md, docs/BOOTSTRAPPING.md, cortex/docs/RUNBOOK.md)
  - **Work:** Verify all links now resolve after files copied in 0.L.1-0.L.3
  - **AC:** `bash tools/validate_links.sh AGENTS.md README.md` passes with no broken link errors
  - **Estimated Time:** [S] 1 minute (verification only)
  - **If Blocked:** Requires tasks 0.L.1, 0.L.2, 0.L.3 completed first

- [ ] **0.L.5** Fix broken links in docs/ markdown files
  - **Affected Files:**
    - `docs/QUALITY_GATES.md` (1 link to CODERABBIT_ISSUES_TRACKER.md)
    - `docs/TOOLS.md` (3 links to events.md, gap_radar/README.md, rollflow_analyze/README.md)
    - `docs/MARKER_SCHEMA.md` (2 links to events.md, rollflow_analyze/README.md)
  - **Work:** Verify all links now resolve after files copied in 0.L.1 and 0.L.3
  - **AC:** `bash tools/validate_links.sh docs/QUALITY_GATES.md docs/TOOLS.md docs/MARKER_SCHEMA.md` passes
  - **Estimated Time:** [S] 1 minute (verification only)
  - **If Blocked:** Requires tasks 0.L.1, 0.L.3 completed first

- [ ] **0.L.6** BATCH: Fix broken links in skills/ markdown files (12 links across 8 files)
  - **Affected Files:**
    - `skills/index.md` (1 link)
    - `skills/domains/code-quality/code-review-patterns.md` (1 link)
    - `skills/domains/code-quality/semantic-code-review.md` (1 link)
    - `skills/domains/anti-patterns/documentation-anti-patterns.md` (2 links)
    - `skills/domains/ralph/cache-debugging.md` (1 link)
    - `skills/domains/ralph/thread-search-patterns.md` (2 links)
    - `skills/domains/ralph/tool-wrapper-patterns.md` (1 link)
    - `skills/projects/brain-example.md` (3 links)
  - **Work:** Update relative paths to correct locations after all file copying is complete
  - **Steps:**
    1. Run `bash tools/validate_links.sh skills/` to get current broken link list
    2. Fix each broken link with correct relative path
    3. Re-run validation to confirm all fixed
  - **AC:** `bash tools/validate_links.sh skills/` passes with no broken link errors
  - **Estimated Time:** [M] 8-12 minutes
  - **If Blocked:** Requires tasks 0.L.1-0.L.3 completed first to ensure target files exist

---

## Phase 5: Apply call checklist updates (site content + UX)

> Source: `brain/cortex/examples/deene-social-call-checklist-filled-2026-01-21-08-03.html`

- [ ] **5.1** Hero/top banner: remove tagline + keep minimal “Deene” block
  - **Goal:** Match agreed direction: clean white hero with the Deene block only.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`, `brain/skills/domains/frontend/accessibility-patterns.md`
  - **Work:**
    - Remove the tagline line “Where authenticity leads, conversation follows.” (or equivalent) from the Hero/banner.
    - Ensure layout still looks intentional on mobile + desktop after removal.
  - **AC:**
    - [ ] Hero renders with no tagline/subheading text
    - [ ] No obvious spacing regressions on mobile + desktop
  - **If Blocked:** If unsure which string is canonical, search for the tagline text across `website/src/` and remove where used.

- [ ] **5.2** Navigation: remove “Clients” from nav (keep one-page scroll)
  - **Goal:** Match call decision: “Clients” removed from the navigation.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`, `brain/skills/domains/code-quality/code-consistency.md`
  - **Work:**
    - Update the nav buttons rendered inside `website/src/components/Hero.tsx` (logo-locked nav).
  - **AC:**
    - [ ] No “Clients” item in the main nav
    - [ ] Remaining nav links still scroll correctly
  - **If Blocked:** If section IDs are coupled to nav generation, remove only the nav item (not the section) unless specifically requested.

- [ ] **5.3** Services section: rename heading to “Services” (remove “Intentionally Crafted”)
  - **Goal:** Use literal naming per call notes.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`
  - **AC:**
    - [ ] Services section heading reads “Services”
    - [ ] No remaining “Intentionally Crafted” heading text
  - **If Blocked:** If there are multiple occurrences (e.g. on cards + section header), update all places that represent the section title.

- [ ] **5.4** “Created” gallery: ensure it exists + group photos + update category labels
  - **Goal:** Ensure the “Created” gallery exists, is grouped by brand/category, and uses the agreed label abbreviations.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`, `brain/skills/domains/frontend/accessibility-patterns.md`
  - **Where:** `website/src/components/` (check for an existing gallery/portfolio component first; update it in-place if found).
  - **Target labels:** Coffee x2; Restaurants; Accommodation; Wine bars; Products; Wine Estates
  - **Work:**
    - Confirm whether a “Created” gallery already exists.
    - If it exists: update the category labels to match the target list.
    - If it does not exist: add a minimal “Created” gallery section **only where images already appear in the design**, grouped by brand/category (no new interactions).
  - **AC:**
    - [ ] A “Created” gallery exists (either pre-existing or newly added as a minimal section)
    - [ ] Photos are grouped by brand/category (clear grouping headings or label clusters)
    - [ ] Category labels match the target list (spelling/case consistent)
    - [ ] Gallery remains scroll-only (no new click-throughs) unless it already supports click-to-advance
  - **If Blocked:** If the gallery is currently label-free, add a minimal caption under each image using the existing text style used for any other captions (or `text-xs` + muted color if no caption style exists).

- [ ] **5.5** Client logos strip: add small “Trusted by” label (above logos)
  - **Goal:** Add the “Trusted by” micro-label above the scrolling client logos strip.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`, `brain/skills/domains/frontend/accessibility-patterns.md`
  - **AC:**
    - [ ] “Trusted by” appears above the logos strip
    - [ ] Label styling is subtle (doesn’t compete with hero headings)
  - **If Blocked:** If there is no logos section heading currently, ensure this label is the only heading (per call notes “no heading” except “Trusted by”).

- [ ] **5.6** Contact section: add WhatsApp button + show email address
  - **Goal:** Provide two clear contact options: form (if present) + WhatsApp, and show email visibly.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`, `brain/skills/domains/frontend/accessibility-patterns.md`
  - **Details:**
    - WhatsApp: +27 78 881 9656
    - Email: <alex@deenesocial.com>
  - **AC:**
    - [ ] WhatsApp button exists and opens `https://wa.me/27788819656` (or equivalent)
    - [ ] WhatsApp number is also shown as plain text near the button
    - [ ] Email address `alex@deenesocial.com` is visible in the contact section
    - [ ] No console errors
  - **If Blocked:** If WhatsApp link format is unclear, use `https://wa.me/27788819656` (international format, no spaces/dashes).

---

## Phase 6: Asset preparation (mock logos, gallery photos, About copy)

> **Context:** We now have `brain/cortex/examples/brand-doc.pdf` with sample photos organized by category (coffee/FVC, coffee/KZ, wine/salt river, menu/wellington). Contact details confirmed: WhatsApp +27 78 881 9656, email <alex@deenesocial.com>. Timing: ASAP. Site hosted on GitHub Pages.

- [ ] **6.1** Create first batch of mock client logos (logos 01-05)
  - **Goal:** Start building logo density for the scrolling client logos strip.
  - **Skills:** `brain/skills/domains/code-quality/code-consistency.md`, `brain/skills/domains/code-quality/code-hygiene.md`
  - **Work:**
    - Generate 5 minimal SVG logos (simple geometric shapes or text-based placeholders)
    - Use a consistent style (monochrome, minimal, geometric)
    - Save as `website/public/logos/logo-01.svg` through `logo-05.svg`
  - **AC:**
    - [ ] 5 SVG files exist in `website/public/logos/`
    - [ ] Each logo is under 5KB and visually distinct
    - [ ] Logos render cleanly in browser (no broken SVG syntax)
  - **If Blocked:** If SVG generation is difficult, use simple text-based SVGs (company initials in a circle) or export from a tool like Figma/Canva.

- [ ] **6.2** Create second batch of mock client logos (logos 06-10)
  - **Goal:** Expand logo density for the scrolling client logos strip.
  - **Skills:** `brain/skills/domains/code-quality/code-consistency.md`, `brain/skills/domains/code-quality/code-hygiene.md`
  - **Work:**
    - Generate 5 minimal SVG logos in the same style
    - Save as `website/public/logos/logo-06.svg` through `logo-10.svg`
  - **AC:**
    - [ ] 5 SVG files exist in `website/public/logos/`
    - [ ] Each logo is under 5KB and visually distinct
    - [ ] Logos render cleanly in browser (no broken SVG syntax)
  - **If Blocked:** If SVG generation is difficult, use simple text-based SVGs (company initials in a circle) or export from a tool like Figma/Canva.

- [ ] **6.3** Create final batch of mock client logos (logos 11-15)
  - **Goal:** Complete logo density for the scrolling client logos strip.
  - **Skills:** `brain/skills/domains/code-quality/code-consistency.md`, `brain/skills/domains/code-quality/code-hygiene.md`
  - **Work:**
    - Generate 5 minimal SVG logos in the same style
    - Save as `website/public/logos/logo-11.svg` through `logo-15.svg`
  - **AC:**
    - [ ] 5 SVG files exist in `website/public/logos/`
    - [ ] Each logo is under 5KB and visually distinct
    - [ ] Logos render cleanly in browser (no broken SVG syntax)
  - **If Blocked:** If SVG generation is difficult, use simple text-based SVGs (company initials in a circle) or export from a tool like Figma/Canva.

- [ ] **6.4** Extract gallery images from brand-doc.pdf (raw exports)
  - **Goal:** Extract source images from the brand doc so we can populate the “Created” gallery.
  - **Skills:** `brain/skills/domains/code-quality/code-hygiene.md`, `brain/skills/domains/languages/shell/validation-patterns.md`
  - **Categories identified:** coffee/FVC, coffee/KZ, wine/salt river, menu/wellington
  - **Work:**
    - Extract images from `brain/cortex/examples/brand-doc.pdf` (pages 1-4)
    - Save **raw exports** to `website/public/gallery/_raw/` with category-based naming (e.g., `coffee-fvc-01.jpg`, `wine-saltriver-01.jpg`)
  - **AC:**
    - [ ] At least 12 raw images extracted and saved in `website/public/gallery/_raw/`
    - [ ] Filenames clearly indicate category
  - **If Blocked:** If PDF extraction is difficult, use a reproducible CLI where possible (`pdfimages`) or do manual screenshot+crop. If you must do manual steps, keep filenames + categories consistent.

- [ ] **6.5** Optimize and resize gallery images (final assets)
  - **Goal:** Produce web-optimized gallery images that we actually ship.
  - **Skills:** `brain/skills/domains/code-quality/code-hygiene.md`, `brain/skills/domains/languages/shell/validation-patterns.md`
  - **Work:**
    - Resize images to max width 1200px
    - Compress to roughly 80% quality
    - Save optimized images to `website/public/gallery/` (same naming, no `_raw`)
    - **Keep only optimized images in the shipped path** (`website/public/gallery/`); raw exports remain in `_raw/`.
  - **AC:**
    - [ ] Each optimized image in `website/public/gallery/` is under 300KB
    - [ ] Filenames clearly indicate category and match the raw set
  - **If Blocked:** If an optimizer isn't available locally, use an online compressor, then re-check file sizes locally and commit only the optimized outputs.

- [ ] **6.6** Draft first-person About copy (text only)
  - **Goal:** Produce final-ish About copy content before editing components.
  - **Skills:**
    - `brain/skills/domains/marketing/content/copywriting.md`
    - `brain/skills/domains/marketing/content/objection-handler.md`
    - `brain/skills/domains/marketing/strategy/value-proposition.md`
    - `brain/skills/domains/marketing/strategy/competitor-alternatives.md`
  - **Tone:** Authentic, conversational, confident but not arrogant. Reflect Deene's brand personality (checklist note: “Where authenticity leads, conversation follows”).
  - **Work:**
    - Write 2-3 paragraphs (~150-200 words total)
    - Focus on: who Deene is, what they do, why they do it, and what makes the approach unique
    - Use "I" or "we" (first-person voice)
    - Save the copy in a comment block at the top of `website/src/components/About.tsx` **without changing layout** yet
  - **AC:**
    - [ ] About copy text exists (first-person) and is 150-250 words
    - [ ] Copy is stored in `website/src/components/About.tsx` as a temporary comment block (no layout changes)
  - **If Blocked:** If unsure of brand positioning, use themes: authenticity, conversation, intentional craft. Keep it simple and human.

- [ ] **6.7** Insert About copy into `About.tsx` (layout-safe)
  - **Goal:** Replace placeholder About text with the approved draft, keeping layout stable.
  - **Skills:** `brain/skills/domains/frontend/react-patterns.md`, `brain/skills/domains/frontend/accessibility-patterns.md`
  - **Work:**
    - Replace placeholder About copy with the drafted text from task 6.6
    - Remove the temporary comment block when done
  - **AC:**
    - [ ] `website/src/components/About.tsx` renders the new copy
    - [ ] No spacing/layout regressions on mobile + desktop
    - [ ] No console errors
  - **If Blocked:** If About component structure makes insertion risky, create a minimal `const aboutCopy = ...` string/array and render it without refactoring the component structure.

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
