# Implementation Plan - Deene Social Presence

**Project:** Deene Social Presence (Marketing Website)
**Repository:** deene-social
**Tech Stack:** React 18.3 + TypeScript + Vite + Tailwind CSS + shadcn-ui
**Created:** 2026-02-06
**Last Updated:** 2026-02-06

---

## Project Status

**Current State:** Website is functionally complete with all major features implemented:
- ✅ Hero section with responsive heading and scroll indicator
- ✅ Services section
- ✅ About section with first-person copy
- ✅ Gallery with carousel and masonry layout (28 images across 4 categories)
- ✅ Client logos with emboss effect and color reveal on hover (15 logos)
- ✅ Contact form with WhatsApp integration
- ✅ Footer with contact details
- ✅ GitHub Pages deployment configured
- ✅ Build passes (352KB bundle)
- ✅ Lint passes (7 warnings in shadcn-ui only)

**Focus Areas:**
1. Content refinement and polish
2. Performance optimization
3. Accessibility enhancements
4. SEO improvements
5. Documentation maintenance

---

## Phase 0-Warn: Verifier Warnings

Currently clean - no verifier warnings to address.

---

## Phase 1: Content & Copy Refinement

### 1.1 Services Section Content

- [ ] **1.1.1** Review and refine Services section copy
  - **Scope:** `website/src/components/Services.tsx`
  - **Context:** Current content may be placeholder or generic
  - **Steps:**
    1. Review existing services copy in Services.tsx
    2. Ensure tone matches first-person About section (authentic, conversational)
    3. Verify service descriptions are specific to Deene Social offerings
    4. Check for consistency with brand voice
  - **AC:** Services copy is polished, specific, and brand-aligned
  - **Estimated Time:** [M] 10-15 minutes

### 1.2 Gallery Image Alt Text

- [ ] **1.2.1** Audit gallery image alt text for accessibility
  - **Scope:** `website/src/data/galleryData.ts`
  - **Context:** Alt text exists but may need refinement for screen readers
  - **Steps:**
    1. Review all 28 image alt descriptions in galleryData.ts
    2. Ensure descriptions are descriptive and specific (not just "coffee shop")
    3. Follow WCAG 2.1 guidelines for alt text
    4. Reference: `brain/skills/domains/frontend/accessibility-patterns.md`
  - **AC:** All alt text is descriptive, contextual, and accessibility-compliant
  - **Estimated Time:** [M] 15-20 minutes

---

## Phase 2: Performance Optimization

### 2.1 Image Optimization

- [ ] **2.1.1** Verify all gallery images are optimized
  - **Scope:** `website/public/gallery/*.jpg`
  - **Context:** Images were resized and compressed (THUNK #87), verify quality/size balance
  - **Steps:**
    1. Check file sizes: `ls -lh website/public/gallery/*.jpg | awk '{print $5, $9}'`
    2. Verify all images <300KB as per optimization spec
    3. Spot-check image quality in browser
    4. If any oversized, re-compress with: `convert input.jpg -quality 75 -resize 1200x output.jpg`
  - **AC:** All gallery images <300KB and maintain acceptable visual quality
  - **Estimated Time:** [S] 5-10 minutes

### 2.2 Bundle Size Analysis

- [ ] **2.2.1** Analyze production bundle for optimization opportunities
  - **Scope:** `website/dist/assets/*`
  - **Context:** Current bundle is 352KB JS (113KB gzipped) - check for low-hanging fruit
  - **Steps:**
    1. Run build with bundle analysis: `npm run build --prefix website`
    2. Check if any large dependencies can be lazy-loaded
    3. Verify tree-shaking is working (no unused shadcn-ui components)
    4. Consider code-splitting for gallery carousel (separate chunk)
  - **AC:** Bundle size documented; optimization opportunities identified or confirmed minimal
  - **Estimated Time:** [M] 10-15 minutes

---

## Phase 3: Accessibility Enhancements

### 3.1 Keyboard Navigation Audit

- [ ] **3.1.1** Test keyboard navigation across all interactive elements
  - **Scope:** All components with interactive elements
  - **Context:** Gallery carousel has keyboard support; verify other components
  - **Steps:**
    1. Tab through entire page, verify focus order is logical
    2. Test all buttons/links with Enter/Space
    3. Verify focus indicators are visible
    4. Check skip-to-content link (if needed)
    5. Reference: `brain/skills/domains/frontend/accessibility-patterns.md`
  - **AC:** All interactive elements are keyboard-accessible with visible focus
  - **Estimated Time:** [M] 15-20 minutes

### 3.2 Screen Reader Testing

- [ ] **3.2.1** Verify ARIA labels and semantic HTML
  - **Scope:** All components
  - **Context:** GalleryCarousel has ARIA labels; verify other components
  - **Steps:**
    1. Audit Hero, Services, About, ClientLogos, Contact, Footer for ARIA
    2. Verify heading hierarchy (h1 → h2 → h3, no skips)
    3. Check landmark regions (nav, main, footer)
    4. Test with screen reader (VoiceOver/NVDA) if possible
  - **AC:** Semantic HTML is correct; ARIA labels present where needed
  - **Estimated Time:** [M] 15-20 minutes

---

## Phase 4: SEO Improvements

### 4.1 Meta Tags

- [ ] **4.1.1** Add comprehensive meta tags for SEO and social sharing
  - **Scope:** `website/index.html`
  - **Context:** Basic HTML exists; needs meta tags for SEO/OG
  - **Steps:**
    1. Add meta description (155 chars max)
    2. Add Open Graph tags (og:title, og:description, og:image, og:url)
    3. Add Twitter Card tags
    4. Verify og:image exists: `website/public/DeeneSocialOG.png`
    5. Reference: `brain/skills/domains/marketing/seo/`
  - **AC:** All SEO and social meta tags present and valid
  - **Estimated Time:** [M] 10-15 minutes

### 4.2 Structured Data

- [ ] **4.2.1** Add JSON-LD structured data for local business
  - **Scope:** `website/index.html`
  - **Context:** Helps search engines understand business type and contact info
  - **Steps:**
    1. Create LocalBusiness schema with name, address, phone, email
    2. Add to index.html as <script type="application/ld+json">
    3. Validate with Google's Rich Results Test
    4. Reference: schema.org/LocalBusiness
  - **AC:** Valid JSON-LD structured data present
  - **Estimated Time:** [M] 15-20 minutes

---

## Phase 5: Testing & QA

### 5.1 Cross-Browser Testing

- [ ] **5.1.1** Test website in major browsers
  - **Scope:** All components
  - **Context:** Dev testing in Chrome; verify Firefox, Safari, Edge
  - **Steps:**
    1. Test locally in available browsers
    2. Check for CSS/layout issues
    3. Verify all interactions work (carousel, hover effects, form)
    4. Document any browser-specific issues
  - **AC:** Website renders correctly in Chrome, Firefox, Safari, Edge
  - **Estimated Time:** [M] 20-30 minutes

### 5.2 Mobile Responsiveness

- [ ] **5.2.1** Test responsive design on mobile viewports
  - **Scope:** All components
  - **Context:** Tailwind responsive classes used; verify breakpoints
  - **Steps:**
    1. Test in DevTools mobile emulation (320px, 375px, 768px, 1024px)
    2. Verify hero heading scales properly (clamp formula)
    3. Check gallery masonry layout (2/3/4 columns)
    4. Verify logo grid responsiveness
    5. Test contact form usability on mobile
  - **AC:** All content is readable and usable on mobile devices
  - **Estimated Time:** [M] 15-20 minutes

---

## Phase 6: Documentation

### 6.1 Component Documentation

- [ ] **6.1.1** Document component props and usage patterns
  - **Scope:** Custom components in `website/src/components/`
  - **Context:** Components lack inline documentation
  - **Steps:**
    1. Add JSDoc comments to GalleryCarousel, CategoryGrid, ClientLogos
    2. Document props (especially enableColorReveal in ClientLogos)
    3. Add usage examples in comments
    4. Keep inline docs minimal (not duplicating obvious props)
  - **AC:** Key components have JSDoc comments for maintainability
  - **Estimated Time:** [M] 15-20 minutes

### 6.2 Deployment Documentation

- [ ] **6.2.1** Verify GitHub Pages deployment instructions in README
  - **Scope:** `README.md`
  - **Context:** README has deployment info; verify it's current
  - **Steps:**
    1. Review deployment section in root README.md
    2. Verify `.github/workflows/deploy.yml` path references
    3. Ensure base path configuration is documented
    4. Test instructions match actual workflow
  - **AC:** Deployment instructions are accurate and complete
  - **Estimated Time:** [S] 5-10 minutes

---

## Phase 7: Future Enhancements (Backlog)

**Note:** These are lower-priority items for future consideration.

### 7.1 Analytics Integration

- [ ] **7.1.1** Add privacy-friendly analytics (Plausible or similar)
  - **Context:** Track visitor metrics without cookies
  - **Dependencies:** Client decision on analytics provider
  - **Estimated Time:** [M] 30-45 minutes

### 7.2 Blog Integration

- [ ] **7.2.1** Add blog section for content marketing
  - **Context:** Could use MDX or headless CMS
  - **Dependencies:** Content strategy decision
  - **Estimated Time:** [L] 2-4 hours

### 7.3 Case Studies Section

- [ ] **7.3.1** Add detailed case study pages
  - **Context:** Showcase client work with before/after, metrics
  - **Dependencies:** Client approval for case study content
  - **Estimated Time:** [L] 3-5 hours

---

## Completion Criteria

Project is complete when:

- [ ] All Phase 1-6 tasks are marked `[x]`
- [ ] Build passes with no errors
- [ ] Lint passes (shadcn-ui warnings acceptable)
- [ ] Website is deployed to GitHub Pages
- [ ] Manual QA confirms all features work
- [ ] Client approves final version

---

## Notes

- **Time Estimates:** [S] <10min, [M] 10-30min, [L] >30min
- **Task IDs:** Use format `Phase.Section.Task` (e.g., `1.1.1`)
- **Dependencies:** Most tasks can be done in any order within their phase
- **Verifier:** Auto-checks run before each BUILD iteration
