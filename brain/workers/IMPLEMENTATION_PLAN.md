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

We want to de-contaminate the deployable website from the repo’s agent/ops scaffolding (`cortex/`, `workers/`, `brain_upstream/`, etc.). The website is self-contained at `../website/` (relative to this `brain/` directory).

**Note:** Phases 0–4 completed the repo cleanup. **Phase 5+ is post-cleanup content + UX updates** for the live marketing site.

**User decisions:**

- Dev/build commands will be run from inside `../website/` (relative to this `brain/` directory).
- Keep a small parent-root `README.md` explaining repo layout, plus a `../website/README.md` for site setup.
- Keep site-only config files inside `../website/` so the site is self-contained.

**Non-goals:**

- Do not refactor UI/UX, routing strategy, or features unless required to keep build/deploy working.

---

## Phase 6: Asset preparation (mock logos, gallery photos, About copy)

> **Context:** We now have `brain/cortex/examples/brand-doc.pdf` with sample photos organized by category (coffee/FVC, coffee/KZ, wine/salt river, menu/wellington). Contact details confirmed: WhatsApp +27 78 881 9656, email <alex@deenesocial.com>. Timing: ASAP. Site hosted on GitHub Pages.

---

## Deployment & Timing Notes

- **Hosting:** Site is deployed on **GitHub Pages** at `https://{username}.github.io/deene-social-presence/`
- **Timing:** **ASAP** (per user direction)
- **Base path:** Configured in `../website/vite.config.ts` as `/deene-social-presence/`

---

## Still Waiting on Alex (final polish only)

These items can be refined later after the site is live (not blockers for ASAP launch):

1. **Final client logos** (real SVGs/PNGs to replace mocks)
2. **Services wording refinements** (copy polish under service headings)
3. **Brand styling references** (detailed typography/spacing rules if needed for final polish)
