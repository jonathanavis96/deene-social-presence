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

## Phase 13: Pre-deployment validation (comprehensive QA)

> **Goal:** Verify all new features work correctly before deployment.

### 13.1: Visual QA (split into atomic section checks)

- [ ] **13.1.6** Visual QA: Console + Network sanity
  - **Goal:** Catch obvious runtime issues before deeper QA
  - **AC:**
    - No console errors during normal navigation/interaction
    - No broken images or 404s in Network tab
  - **If Blocked:** Copy exact error messages + affected route/asset
  - **Estimated Time:** [S] 5-8 minutes

### 13.2: Responsive testing (split by breakpoint)

- [ ] **13.2.1** Responsive testing: Mobile (375px)
  - **Goal:** Ensure mobile experience is clean and usable
  - **AC:**
    - No horizontal scroll
    - Hero heading fits and remains readable
    - Gallery grid adapts to 1–2 columns
    - Logos and footer stack correctly
  - **If Blocked:** Document exact viewport width and issue
  - **Estimated Time:** [S] 6-10 minutes

- [ ] **13.2.2** Responsive testing: Tablet (768px)
  - **Goal:** Ensure tablet layout is balanced
  - **AC:**
    - Gallery grid adapts to 2–3 columns
    - Logos layout looks intentional (2–3 columns)
    - No awkward whitespace/overlaps
  - **If Blocked:** Document exact viewport width and issue
  - **Estimated Time:** [S] 6-10 minutes

- [ ] **13.2.3** Responsive testing: Desktop (1440px)
  - **Goal:** Ensure desktop layout uses space well and looks premium
  - **AC:**
    - Gallery grid uses 3–4 columns effectively
    - Hero typography and spacing look intentional
    - No layout clipping or weird max-width constraints
  - **If Blocked:** Document exact viewport width and issue
  - **Estimated Time:** [S] 6-10 minutes

### 13.3: Accessibility audit (split)

- [ ] **13.3.1** A11y: Keyboard navigation + focus states
  - **Goal:** Ensure interactive elements are reachable and usable via keyboard
  - **AC:**
    - Tab through carousel controls, logo grid, footer links
    - Focus states are visible
  - **If Blocked:** Note which element cannot be reached or lacks focus styling
  - **Estimated Time:** [S] 8-12 minutes

- [ ] **13.3.2** A11y: Reduced motion support
  - **Goal:** Respect user motion preferences
  - **AC:**
    - With `prefers-reduced-motion` enabled, scroll arrow animation pauses/stops
  - **If Blocked:** Implement reduced-motion conditional CSS
  - **Estimated Time:** [S] 5-8 minutes

- [ ] **13.3.3** A11y: Semantics + labels (images, carousel, WhatsApp)
  - **Goal:** Ensure screen-reader relevant metadata exists
  - **AC:**
    - All gallery images have meaningful alt text
    - Carousel controls have appropriate labels
    - WhatsApp link has `aria-label`
  - **If Blocked:** Use `skills/domains/frontend/accessibility-patterns.md` as reference
  - **Estimated Time:** [S] 8-12 minutes

- [ ] **13.3.4** A11y: Automated check (axe or Lighthouse)
  - **Goal:** Catch easy-to-miss a11y issues
  - **AC:**
    - Run axe DevTools or Lighthouse Accessibility
    - Capture top issues (if any) and fix the highest-impact ones
  - **If Blocked:** If tooling isn’t available, at least run Lighthouse
  - **Estimated Time:** [S] 10-15 minutes

### 13.4: Performance check (split)

- [ ] **13.4.1** Performance: Lighthouse baseline
  - **Goal:** Ensure changes didn’t tank performance
  - **AC:**
    - Run Lighthouse audit in Chrome DevTools
    - Target: Performance 90+ desktop, 80+ mobile
  - **If Blocked:** If score is low, record the top 3 causes
  - **Estimated Time:** [S] 8-12 minutes

- [ ] **13.4.2** Performance: Weight + smoothness sanity
  - **Goal:** Ensure assets/animations feel smooth
  - **AC:**
    - Carousel transitions are smooth (no jank)
    - Animations are smooth
    - Total page weight reasonable (<2MB initial load, excluding lazy-loaded images)
    - Lazy loading works (images load as needed)
  - **If Blocked:** Identify largest assets and document candidates for optimization
  - **Estimated Time:** [S] 8-12 minutes

- [ ] **13.5.1** Production build validation
  - **Goal:** Verify production build succeeds and outputs correct assets
  - **AC:**
    - Run `npm run build` from `../website/` - completes without errors or warnings
    - Verify `dist/` contains expected assets:
      - 15 monochrome logos (`logos/logo-01.svg` through `logo-15.svg`)
      - 15 colored logos (`logos/_colored/logo-01-color.svg` through `logo-15-color.svg`)
      - 28 gallery images (coffee-fvc, coffee-kz, wine-saltriver, menu-wellington)
    - Run `npm run preview` - site serves correctly with base path `/deene-social-presence/`
    - No 404s or broken paths in production preview
  - **If Blocked:** If build fails, fix build errors before proceeding
  - **Estimated Time:** [M] 8-12 minutes

---

## Deployment & Timing Notes

- **Hosting:** GitHub Pages at `https://{username}.github.io/deene-social-presence/`
- **Timing:** ASAP (all phases should be completed before deployment)
- **Base path:** Configured in `../website/vite.config.ts` as `/deene-social-presence/`
- **Post-deployment:** Monitor for any issues, collect user feedback on new features

---

## Feature Flags & Future Refinements

**Optional feature toggles** (can be disabled if client prefers):

1. **Logo color reveal on hover** - Set `enableColorReveal={false}` in `ClientLogos` component
2. **Logo lift effect on hover** - Remove hover transform in CSS if too much
3. **Scroll arrow animation** - Remove animation class if too distracting
4. **Carousel auto-rotate** - Set `autoPlay={false}` on `GalleryCarousel` if client prefers manual control

**Still waiting on client (non-blocking):**

1. Real client logos (to replace placeholder realistic logos)
2. Additional gallery images (to expand categories beyond 7 per category)
3. Final copy polish (services descriptions, about section refinements)
