# DECISIONS.md - Deene Social Presence

**Purpose:** Architectural decisions and conventions for Deene Social Presence

**Last updated:** 2026-01-30 14:03:30

---

## Active Decisions

### DEC-2026-01-30-001: Deploy as a static Vite SPA on GitHub Pages with base path

**Date:** 2026-01-30 14:03:30

**Decision:**

- Deploy the site via GitHub Pages under the base path `/deene-social-presence/`.
- Treat the app as a static SPA (Vite build output), and ensure routes/links respect the base path.

**Rationale:**

- Simplest and lowest-cost hosting for a marketing site.
- Matches current repo configuration (`vite.config.ts base`).

**Implementation:**

- `vite.config.ts` sets `base: "/deene-social-presence/"`.
- Any internal links (including 404 recovery) should use React Router (`Link`) or `import.meta.env.BASE_URL`.

**Impact:**

- Local dev works at `/`, but production must work under a non-root prefix.
- Documentation and future code changes must avoid hard-coded `/` assumptions.

---

## Decision Template

When adding decisions, use this format:

```markdown
### DEC-YYYY-MM-DD-NNN: Decision Title

**Date:** YYYY-MM-DD HH:MM:SS

**Decision:** What was decided?

**Rationale:**
- Why this approach?
- What alternatives were considered?
- What are the tradeoffs?

**Implementation:**
- How is this enforced?
- What files/patterns are affected?

**Impact:** Effect on project, team, or architecture
```

---

## When to Add Decisions

**Do add:**

- Deployment conventions (GitHub Pages base path, routing strategy)
- Major architecture changes (routing, section structure, design system changes)
- Process conventions (commit policy, release process)

**Don't add:**

- Small bug fixes
- Purely stylistic changes without rationale

**Next review:** After docs + routing/contact fixes are complete
