# Implementation Plan - Deene Social Presence

**Project:** deene-social  
**Repository:** brain  
**Work Branch:** deene-social-presence-work  
**Last Updated:** 2026-02-06

---

## Phase 0-Lint: Markdown Lint Fixes

### MD051 - Link Fragment Errors

- [x] **0.1** Fix MD051 link fragments in CONTRIBUTING.md
  - **File:** `CONTRIBUTING.md:11,12,13`
  - **Issue:** Link fragments reference non-existent section anchors
  - **Root Cause:** Section headers "Development Workflow", "Quality Standards", and "Common Tasks" do not exist in the document
  - **Fix:** Either add the missing sections or remove the invalid TOC links
  - **Steps:**
    1. Verify which sections exist: `grep -n "^## " CONTRIBUTING.md`
    2. Either create missing sections or update TOC to match existing structure
    3. Validate: `markdownlint CONTRIBUTING.md` passes with no MD051 errors
  - **AC:** `markdownlint CONTRIBUTING.md` shows no MD051 errors
  - **Priority:** High (blocks documentation navigation)

---

## Phase 1-Links: Broken Internal Links

- [x] **1.1** Fix broken links in docs/TOOLS.md
  - **File:** `docs/TOOLS.md:423,424`
  - **Issue:** Links to `tools/gap_radar/README.md` and `tools/rollflow_analyze/README.md` point to wrong location
  - **Current Path:** `../tools/gap_radar/README.md` (relative from docs/)
  - **Actual Path:** `../brain_upstream/tools/gap_radar/README.md`
  - **Fix:** Update relative links to point to brain_upstream/tools/ subdirectory
  - **Steps:**
    1. Verify actual location: `ls brain_upstream/tools/gap_radar/README.md brain_upstream/tools/rollflow_analyze/README.md`
    2. Update both links in docs/TOOLS.md to use correct relative path
    3. Validate: `bash tools/validate_links.sh docs/TOOLS.md` passes
  - **AC:** `bash tools/validate_links.sh docs/TOOLS.md` passes
  - **Priority:** Medium

- [ ] **1.2** Fix broken link in docs/MARKER_SCHEMA.md
  - **File:** `docs/MARKER_SCHEMA.md:286`
  - **Issue:** Link to `tools/rollflow_analyze/README.md` uses incorrect path
  - **Current Path:** `../tools/rollflow_analyze/README.md`
  - **Actual Path:** `../brain_upstream/tools/rollflow_analyze/README.md`
  - **Fix:** Update relative link to brain_upstream subdirectory
  - **Steps:**
    1. Update link in docs/MARKER_SCHEMA.md line 286
    2. Validate: `bash tools/validate_links.sh docs/MARKER_SCHEMA.md` passes
  - **AC:** `bash tools/validate_links.sh docs/MARKER_SCHEMA.md` passes
  - **Priority:** Medium

- [ ] **1.3** Create missing IMPLEMENTATION_PLAN.md referenced in THOUGHTS.md
  - **File:** `THOUGHTS.md:263`
  - **Issue:** Link to `IMPLEMENTATION_PLAN.md` was broken (file didn't exist)
  - **Status:** ✅ File created in this planning phase
  - **Note:** This task documents the file creation for tracking purposes
  - **AC:** Link in THOUGHTS.md resolves correctly
  - **Priority:** High (COMPLETED in planning phase)

- [ ] **1.4** Create or fix missing cortex/docs/RUNBOOK.md
  - **File:** `README.md:225`
  - **Issue:** Link to `cortex/docs/RUNBOOK.md` points to non-existent file
  - **Investigation Needed:**
    1. Check if RUNBOOK.md exists in brain_upstream: `find brain_upstream/cortex -name "RUNBOOK.md"`
    2. If exists in upstream, copy to local cortex/docs/
    3. If doesn't exist, either create basic RUNBOOK.md or remove link from README.md
  - **Steps:**
    1. Search for RUNBOOK.md: `find . -name "RUNBOOK.md" -type f`
    2. Decide: copy from upstream, create new, or remove link
    3. Validate: `bash tools/validate_links.sh README.md` passes
  - **AC:** `bash tools/validate_links.sh README.md` passes
  - **Priority:** Medium

---

## Phase 0-Lint: Markdown Lint Fixes (continued)

### MD036 - Emphasis Used Instead of Heading

- [ ] **0.2** Fix MD036 in IMPLEMENTATION_PLAN.md
  - **File:** `IMPLEMENTATION_PLAN.md:81`
  - **Issue:** Italic text "*Future phases to be added as project requirements emerge*" used instead of proper heading
  - **Fix:** Convert to proper heading or regular text
  - **Steps:**
    1. Change italic emphasis to regular paragraph text
    2. Validate: `markdownlint IMPLEMENTATION_PLAN.md` passes with no MD036 errors
  - **AC:** `markdownlint IMPLEMENTATION_PLAN.md` shows no MD036 errors
  - **Priority:** Low

---

## Phase 2-Future: Feature Development

Future phases to be added as project requirements emerge.

---

## Completion Criteria

All tasks marked `[x]` and:

- `markdownlint **/*.md` passes with no MD051 errors
- `bash tools/validate_links.sh` passes for all documented files
- All referenced files exist in repository
- Documentation structure is consistent and navigable
