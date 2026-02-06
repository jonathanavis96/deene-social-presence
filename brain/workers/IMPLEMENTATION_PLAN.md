# Implementation Plan — Deene Social Presence

Last Updated: 2026-02-06 11:19:50

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

## Context / Why (source of truth)

We want to de-contaminate the deployable website from the repo’s agent/ops scaffolding (`cortex/`, `workers/`, `brain_upstream/`, etc.). The website should be fully self-contained under `website/`.

**User decisions:**

- Dev/build commands will be run from inside `website/` (no need for root-level delegating scripts).
- Keep a small root `README.md` explaining repo layout, plus a `website/README.md` for site setup.
- Move site-only config files into `website/` so the site is self-contained.

**Non-goals:**

- Do not refactor UI/UX, routing strategy, or features unless required to keep build/deploy working.

---

## Phases 0-4: Repository Setup (COMPLETED)

> **Summary:** Phases 0-4 completed and logged to THUNK #109-113 on 2026-02-06.
>
> - Phase 0: Link validation verified (excludes brain_upstream/)
> - Phase 1: Repo structure reorganized (website/ + brain/ folders)
> - Phase 2: GitHub Pages workflow updated for website/ build
> - Phase 3: Documentation split (root README + website/README.md)
> - Phase 4: Build/lint verified working (7 warnings in shadcn-ui, expected)

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
