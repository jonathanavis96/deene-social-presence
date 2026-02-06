# Spec Change Request - Ralph loop workspace root auto-detection (monorepo support)

## Problem

When running Ralph from a monorepo that contains multiple top-level projects (e.g., `brain/` and `website/`), Ralph currently sets its workspace root (`ROOT`) to the **Brain directory** by default:

- Script location: `brain/workers/ralph/loop.sh`
- Current default root derivation: `brain/workers/ralph -> brain`

Ralph then runs `acli rovodev run` from within `brain/`.

**Result:** RovoDev’s workspace boundary is limited to the `brain/` directory, so any task that references `../website/...` fails with errors like:

- “cannot create files outside workspace”

This blocks tasks that legitimately need to write to sibling folders (e.g., `website/`).

## Desired Behavior

When `loop.sh` is executed inside a repo root that contains `brain/` and other sibling project directories, Ralph should:

1. Default to using the **repo root** as `ROOT` (workspace boundary = whole repo), not just the `brain/` directory.
2. Continue to support explicit override via `RALPH_PROJECT_ROOT`.
3. Remain backward-compatible for repos where `brain/` *is* the repo root (i.e., no monorepo).

## Proposed Changes (workers/ralph/loop.sh)

### A) Add monorepo auto-detection for ROOT

Current behavior (simplified):

- If `RALPH_PROJECT_ROOT` set: use it.
- Else: set `ROOT` to `brain/`.

**Change:** If `RALPH_PROJECT_ROOT` is not set, compute both:

- `BRAIN_ROOT` = current logic (`brain/`)
- `CANDIDATE_REPO_ROOT` = parent of `BRAIN_ROOT`

Then choose `ROOT` as:

- If `CANDIDATE_REPO_ROOT` contains `brain/` **and** at least one sibling “work” directory expected by this repo (e.g., `website/`), treat it as monorepo and set `ROOT=CANDIDATE_REPO_ROOT`.
- Else, keep existing behavior (`ROOT=BRAIN_ROOT`).

Concrete heuristic for this repo:

- If `test -d "${CANDIDATE_REPO_ROOT}/brain"` AND `test -d "${CANDIDATE_REPO_ROOT}/website"`, then `ROOT="${CANDIDATE_REPO_ROOT}"`.

### B) Keep paths to Ralph worker folder correct

When `ROOT` becomes the repo root, `RALPH` should be:

- `RALPH="$ROOT/brain/workers/ralph"`

When `ROOT` is the brain root, `RALPH` should remain:

- `RALPH="$ROOT/workers/ralph"`

### C) Print effective workspace root early

Add a debug line early in startup:

- `echo "Workspace ROOT=$ROOT"`

This makes it immediately obvious whether the workspace boundary is correct.

## Acceptance Criteria

- Running from monorepo root:

  ```bash
  bash brain/workers/ralph/loop.sh --iterations 1
  ```

  - `ROOT` resolves to the monorepo root (the folder that contains both `brain/` and `website/`).
  - RovoDev can create/edit files under `website/`.

- Running from inside brain-only repo:

  ```bash
  bash workers/ralph/loop.sh --iterations 1
  ```

  - `ROOT` resolves to the brain repo root as before.

- `RALPH_PROJECT_ROOT` override still works:

  ```bash
  RALPH_PROJECT_ROOT="/path/to/repo-root" bash brain/workers/ralph/loop.sh --iterations 1
  ```

## Why this change matters

This repo’s plan intentionally references `../website/...` from within `brain/`. Without widening the workspace boundary, Ralph is structurally unable to perform planned tasks.

## Template Propagation

This behavior should be updated in the upstream Ralph template so future projects don’t inherit the same limitation:

- `brain_upstream/templates/ralph/loop.sh`

Also consider updating any README/docs that instruct how to run Ralph in monorepos:

- `workers/ralph/RALPH.md`
- `workers/ralph/README.md`

