# Implementation Plan — Deene Social Presence

Last Updated: 2026-02-06 15:30:39

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

This plan transforms the Deene Social Presence marketing site into a premium brand showcase with:

- **Realistic, embossed monochrome logos** (raised stamp effect, hover reveal)
- **Category-based gallery carousel** (masonry grid, auto-rotation, smart spacing)
- **Enhanced hero typography** (2x larger heading, connected scroll indicator with animated arrow)
- **Improved footer contact** (WhatsApp icon, larger spacing, better hierarchy)

**User decisions:**

- Dev/build commands run from `../website/` (relative to this `brain/` directory)
- Site hosted on GitHub Pages: `/deene-social-presence/`
- Timing: **ASAP**
- Gallery layout inspired by `cortex/examples/brand-doc.pdf` (masonry + mixed sizes)
- Logo emboss reference: `cortex/examples/embossed-logo-example.avif` (subtle raised stamp effect)

---

## Phase 9: Logo system upgrade (realistic + embossed + hover reveal)

> **Goal:** Replace simple placeholder logos with realistic-looking monochrome SVGs that have embossed/raised effect, with optional color reveal on hover.

### 9.1: Create logo conversion script

### 9.2: Generate realistic placeholder logos

- [ ] **9.2.2** Create 5 realistic brand-style logos (colored): 06–10
  - **Goal:** Continue building the realistic colored logo set in batches (keeps iteration atomic)
  - **AC:**
    - Create 5 additional unique logos under `../website/public/logos/_colored/logo-06-color.svg` through `logo-10-color.svg`
    - Logos are visually distinct from 01–05 and from each other
  - **If Blocked:** Same as 9.2.1
  - **Estimated Time:** [M] 15-20 minutes

- [ ] **9.2.3** Create 5 realistic brand-style logos (colored): 11–15
  - **Goal:** Complete the realistic colored logo set
  - **AC:**
    - Create 5 additional unique logos under `../website/public/logos/_colored/logo-11-color.svg` through `logo-15-color.svg`
    - Logos are visually distinct from 01–10 and from each other
  - **If Blocked:** Same as 9.2.1
  - **Estimated Time:** [M] 15-20 minutes

- [ ] **9.2.4** Convert colored logos to monochrome using script
  - **Goal:** Generate monochrome versions that match website background color
  - **AC:**
    - Run conversion script on all 15 colored logos
    - Output monochrome SVGs to `../website/public/logos/logo-01.svg` through `logo-15.svg` (replace existing simple logos)
    - Monochrome color: `#E5E7EB` (light gray, matches site background - adjust if background differs)
    - All logos have consistent padding and aspect ratio
    - Verify logos are visible but subtle against background
  - **If Blocked:** If script needs adjustment for certain logos, document edge cases and tweak threshold/color values
  - **Estimated Time:** [S] 5-8 minutes

### 9.3: Implement embossed/raised CSS effect

- [ ] **9.3.1** Add emboss styling to ClientLogos component
  - **Goal:** Make logos appear "raised" or "stamped" on the background (subtle 3D effect)
  - **AC:**
    - Add CSS class `.logo-embossed` with:
      - `filter: drop-shadow()` for soft shadow beneath (subtle, ~2-4px blur, low opacity)
      - Optional: inset highlight on top edge using pseudo-element or additional shadow
      - Effect should be visible but not blatant (premium/clean aesthetic)
    - Apply effect to all logo images in `ClientLogos.tsx`
    - Reference: `cortex/examples/embossed-logo-example.avif` for visual target
    - Check `skills/domains/websites/design/design-direction.md` for shadow best practices (subtle, soft shadows only)
  - **If Blocked:** Test shadow values in browser DevTools to find right balance of visibility vs subtlety
  - **Estimated Time:** [M] 10-15 minutes

### 9.4: Implement hover reveal (optional feature flag)

- [ ] **9.4.1** Add color reveal on logo hover
  - **Goal:** When user hovers logo, smoothly transition from monochrome to full color (optional feature, easily toggled off)
  - **AC:**
    - Modify `ClientLogos.tsx` to support dual images per logo: monochrome default, colored hover state
    - Add image paths: `logos/logo-01.svg` (mono) and `logos/_colored/logo-01-color.svg` (color)
    - Implement hover effect: crossfade between mono and color versions (CSS `opacity` transition, ~300ms ease)
    - Add optional prop `enableColorReveal` (boolean) to ClientLogos component
      - Defaults to `true`
      - When `false`, logos stay monochrome on hover
    - Document prop in component comment: "Set enableColorReveal={false} to disable color hover effect"
  - **If Blocked:** Check `skills/domains/frontend/react-patterns.md` for image transition patterns
  - **Estimated Time:** [M] 12-18 minutes

- [ ] **9.4.2** Add subtle lift effect on hover
  - **Goal:** Logos lift slightly when hovered (increases perceived depth)
  - **AC:**
    - On hover: increase shadow strength (deeper/darker shadow)
    - Optional: slight `transform: translateY(-2px)` to enhance lift
    - Smooth transition (~200ms ease)
    - Can be toggled independently of color reveal (always enabled unless explicitly disabled)
  - **If Blocked:** Test in browser to ensure lift doesn't conflict with color reveal animation
  - **Estimated Time:** [S] 5-8 minutes

---

## Phase 10: Gallery carousel system (category-based, masonry grid)

> **Goal:** Replace single-list gallery with category-based carousel where each slide shows a masonry/mixed-size grid of images from one category. Auto-rotates through categories (coffee-fvc → wine-saltriver → menu-wellington → coffee-kz) to keep similar items separated.

### 10.1: Install carousel dependencies

- [ ] **10.1.1** Install Embla carousel library
  - **Goal:** Add a lightweight, accessible carousel library with React support
  - **AC:**
    - Install `embla-carousel-react`
    - Update `../website/package.json` and run `npm install`
    - Build still passes after installation
  - **If Blocked:** If Embla install fails or is incompatible, choose `swiper` as fallback (must support auto-rotate and accessibility)
  - **Estimated Time:** [S] 3-5 minutes

### 10.2: Restructure gallery data by category

- [ ] **10.2.1** Create gallery data structure with categories
  - **Goal:** Organize 28 images into 4 category groups for carousel slides
  - **AC:**
    - Create `../website/src/data/galleryData.ts` with structure:

      ```typescript
      export const galleryCategories = [
        {
          id: 'coffee-fvc',
          title: 'Coffee / FVC',
          images: [
            { src: '/gallery/coffee-fvc-01.jpg', alt: 'FVC coffee product photography' },
            // ... 7 images total
          ]
        },
        {
          id: 'wine-saltriver',
          title: 'Wine / Salt River',
          images: [ /* 7 images */ ]
        },
        {
          id: 'menu-wellington',
          title: 'Menu / Wellington',
          images: [ /* 7 images */ ]
        },
        {
          id: 'coffee-kz',
          title: 'Coffee / KZ',
          images: [ /* 7 images */ ]
        }
      ];
      ```

    - Order ensures coffee categories are separated: FVC → Wine → Menu → KZ
    - Each image has meaningful `alt` text for accessibility (see `skills/domains/frontend/accessibility-patterns.md`)
    - Total: 28 images (7 per category, verified against `../website/public/gallery/` contents)
  - **If Blocked:** If the file list doesn’t match the expected 7-per-category naming, document the discrepancy and propose the correct mapping before changing layout assumptions
  - **Estimated Time:** [M] 8-12 minutes

### 10.3: Build category carousel component

- [ ] **10.3.1** Create `GalleryCarousel` component
  - **Goal:** Carousel that auto-rotates through category slides
  - **AC:**
    - Create `../website/src/components/GalleryCarousel.tsx`
    - Each slide = one category
    - Auto-play enabled: rotate every 5-7 seconds (configurable)
    - Smooth transitions between slides (fade or slide, ~500ms)
    - Manual controls: prev/next arrows + dot indicators
    - Pause auto-play on hover (accessibility best practice)
    - Keyboard navigation: arrow keys, Enter/Space to pause
    - Check `skills/domains/frontend/accessibility-patterns.md` for carousel a11y requirements
    - Expose an `autoPlay` (boolean) prop on the component for feature-flagging (default `true`)
  - **If Blocked:** If carousel library lacks auto-play, implement with `setInterval` + cleanup in `useEffect`
  - **Estimated Time:** [M] 15-20 minutes

### 10.4: Build masonry grid layout for each slide

- [ ] **10.4.1** Create `CategoryGrid` component with masonry/mixed-size layout
  - **Goal:** Each carousel slide shows a visually interesting grid that matches `cortex/examples/brand-doc.pdf` aesthetic (masonry + some larger tiles)
  - **AC:**
    - Create `../website/src/components/CategoryGrid.tsx`
    - Layout style: masonry or CSS Grid with mixed sizes (some images span 2 columns or 2 rows)
    - Images fill container artistically (not rigid uniform grid)
    - Consistent aspect ratio per image using container + `object-cover` (see `skills/domains/websites/design/spacing-layout.md`)
    - Responsive: adjust grid columns for mobile (1-2 cols), tablet (2-3 cols), desktop (3-4 cols)
    - Lazy loading: use `loading="lazy"` attribute for performance
    - Add subtle shadow to images (soft, similar to logo emboss) for cohesive design
  - **If Blocked:** If masonry is too complex, use mixed-size CSS Grid as fallback
  - **Estimated Time:** [L] 25-35 minutes

- [ ] **10.4.2** Integrate `CategoryGrid` into `GalleryCarousel` slides
  - **Goal:** Wire up masonry grid inside each carousel slide
  - **AC:**
    - Each carousel slide renders `<CategoryGrid images={category.images} />`
    - All 28 images display correctly across 4 slides (7 per slide)
    - No layout jump when switching slides
    - Images load without broken paths
    - Build passes, no TypeScript errors
  - **If Blocked:** If images don't load, verify paths in `galleryData.ts` match `../website/public/gallery/` file names
  - **Estimated Time:** [M] 8-12 minutes

### 10.5: Replace old Gallery component

- [ ] **10.5.1** Swap `Gallery.tsx` to use `GalleryCarousel`
  - **Goal:** Replace existing single-list gallery with new carousel system
  - **AC:**
    - Update `../website/src/components/Gallery.tsx` (or create new file if needed) to render `<GalleryCarousel />`
    - Remove old placeholder gallery code (long single list)
    - Component maintains same section structure (heading, description, carousel content)
    - Verify in browser: auto-rotation works, manual controls work, masonry grid displays correctly
  - **If Blocked:** If `Gallery.tsx` doesn't exist, create it and update parent page component to import it
  - **Estimated Time:** [S] 5-8 minutes

---

## Phase 11: Hero enhancements (larger heading, connected lines, animated scroll arrow)

> **Goal:** Make hero more impactful with 2x larger "DEENE SOCIAL" heading, connected scroll indicator lines, and animated pulse on arrow.

- [ ] **11.1.1** Double Hero heading size
  - **Goal:** Make main heading ("DEENE SOCIAL") significantly larger and more prominent
  - **AC:**
    - Update `Hero.tsx` heading styles to 2x current size
    - Responsive scaling: full 2x on desktop, scaled down appropriately for mobile (ensure readability, no overflow)
    - Check `skills/domains/websites/design/typography-system.md` for responsive scaling patterns
    - Test on mobile: heading fits screen width without horizontal scroll
    - Typography remains crisp and legible at larger size
  - **If Blocked:** If 2x causes layout issues on mobile, use fluid typography (`clamp()` or `vw`-based sizing)
  - **Estimated Time:** [M] 10-15 minutes

- [ ] **11.2.1** Connect scroll indicator lines
  - **Goal:** Create unified scroll indicator below hero heading (was 2 disconnected lines, now 1 connected line with arrow)
  - **AC:**
    - Locate existing scroll indicator in `Hero.tsx`
    - Replace with single continuous vertical line from top to arrow
    - Arrow remains at bottom of line
    - Clean visual: single stroke weight, no gaps or misalignment
    - Line feels like a subtle guide (not overpowering)
  - **If Blocked:** If scroll indicator doesn't exist, create one: thin vertical line (~1-2px) with down arrow at bottom
  - **Estimated Time:** [M] 8-12 minutes

- [ ] **11.3.1** Add animated pulse to scroll arrow
  - **Goal:** Draw attention to scroll action with subtle wave/pulse animation moving from top of line to arrow
  - **AC:**
    - Add CSS animation: light pulse/glow that travels down the line and emphasizes the arrow
    - Animation: slow (~2-3 seconds), continuous loop, subtle (not distracting)
    - Use CSS animations (avoid heavy JS)
    - Animation pauses/stops if user has `prefers-reduced-motion` set (accessibility)
  - **If Blocked:** If wave/pulse is too complex, simplify to arrow-only pulse (fade in/out or slight scale)
  - **Estimated Time:** [M] 12-18 minutes

---

## Phase 12: Footer improvements (spacing, sizing, WhatsApp icon)

> **Goal:** Make footer contact details more readable and properly styled with WhatsApp branding.

- [ ] **12.1.1** Increase footer contact spacing and sizing
  - **Goal:** Give phone, handle, and email more visual prominence and breathing room
  - **AC:**
    - Phone (`+27 78 881 9656`), handle (`@deenesocial`), and email (`alex@deenesocial.com`) on separate lines with larger spacing between them
    - Increase font size: phone and handle larger than current, email slightly larger than body text
    - Add vertical spacing between contact items (e.g., `gap-4` or `space-y-4` in Tailwind)
    - Desktop layout may use 2 columns if it improves readability, but ensure mobile stacks vertically
    - Check `skills/domains/websites/design/spacing-layout.md` for spacing rhythm patterns
  - **If Blocked:** If footer layout is complex, simplify first (remove clutter) then apply spacing
  - **Estimated Time:** [M] 10-15 minutes

- [ ] **12.2.1** Replace chat icon with WhatsApp icon (keep current color scheme)
  - **Goal:** Use WhatsApp icon for clarity while maintaining site's visual consistency
  - **AC:**
    - Replace generic chat icon with WhatsApp icon (SVG or icon library)
    - **Icon color:** use current site's brown/cream color scheme (not WhatsApp green)
    - Icon is clickable: link to `https://wa.me/27788819656`
    - Phone number remains visible as text next to icon
    - Add accessible label: `aria-label="Contact us on WhatsApp at +27 78 881 9656"`
    - Icon size is consistent with other footer icons and visually balanced with text
    - Check `skills/domains/frontend/accessibility-patterns.md` for icon link accessibility patterns
  - **If Blocked:** If WhatsApp icon isn't available in preferred library, use an alternate set and restyle via CSS/props
  - **Estimated Time:** [M] 8-12 minutes

---

## Phase 13: Pre-deployment validation (comprehensive QA)

> **Goal:** Verify all new features work correctly before deployment.

### 13.1: Visual QA (split into atomic section checks)

- [ ] **13.1.1** Visual QA: Hero + Services + About (no regressions)
  - **Goal:** Confirm core sections still render correctly after changes
  - **AC:**
    - Run `npm run dev` from `../website/`
    - Verify:
      - **Hero:** heading fits on mobile and looks correct on desktop
      - **Services:** displays correctly (no regressions)
      - **About:** displays correctly (no regressions)
  - **If Blocked:** Document exact section + screenshot + console output
  - **Estimated Time:** [S] 5-8 minutes

- [ ] **13.1.2** Visual QA: Gallery carousel behavior
  - **Goal:** Validate the carousel and slide rotation UX
  - **AC:**
    - Carousel auto-rotates through categories in order: FVC → Wine → Menu → KZ
    - Manual controls work (prev/next + dots)
    - Auto-rotation pauses on hover
    - No layout jumps switching slides
  - **If Blocked:** Document failure mode + whether it’s library or integration-related
  - **Estimated Time:** [S] 5-8 minutes

- [ ] **13.1.3** Visual QA: Gallery images + masonry layout correctness
  - **Goal:** Confirm all images render correctly and the grid matches intended aesthetic
  - **AC:**
    - Each slide shows 7 images (28 total across 4 slides)
    - No broken images / 404s
    - Masonry/mixed-size layout looks intentional (not a uniform grid)
  - **If Blocked:** Check mapping in `../website/src/data/galleryData.ts` vs `../website/public/gallery/` names
  - **Estimated Time:** [S] 5-8 minutes

- [ ] **13.1.4** Visual QA: ClientLogos (emboss + hover behavior)
  - **Goal:** Confirm logos are present, styled correctly, and interactions work
  - **AC:**
    - 15 logos load successfully
    - Emboss effect is visible but subtle
    - Hover behavior matches feature flags (color reveal if enabled, lift effect works)
  - **If Blocked:** Confirm file paths under `public/logos/` and component path usage
  - **Estimated Time:** [S] 5-8 minutes

- [ ] **13.1.5** Visual QA: Footer contact hierarchy + WhatsApp link
  - **Goal:** Confirm footer readability and WhatsApp link correctness
  - **AC:**
    - Footer contact info has improved spacing/sizing
    - WhatsApp icon is present, styled in site palette
    - Link opens `https://wa.me/27788819656`
  - **If Blocked:** Verify anchor `href`, icon import, and Tailwind styling
  - **Estimated Time:** [S] 5-8 minutes

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
