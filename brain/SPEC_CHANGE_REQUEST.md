# Spec Change Request - Ralph prompt + loop efficiency improvements

## Problem

Ralph sometimes wastes iterations on basic orientation (e.g., running `find`/`ls`/`grep` to rediscover repo structure) and can mis-identify which directory contains the actual app. This slows down delivery and causes plan drift.

- Script location: `brain/workers/ralph/loop.sh`
- Current default root derivation: `brain/workers/ralph -> brain`

Ralph then runs `acli rovodev run` from within `brain/`.

**Result:** RovoDev’s workspace boundary is limited to the `brain/` directory, so any task that references `../website/...` fails with errors like:

- “cannot create files outside workspace”

This blocks tasks that legitimately need to write to sibling folders (e.g., `website/`).

## Desired Behavior

### Prompt efficiency / orientation

Ralph should stop spending iterations on basic orientation and instead:

1. **Assume repo root = current workspace root** unless explicitly told otherwise.
2. **Identify the app root once** (e.g., by checking for `package.json` + `src/` + Vite config) and then treat it as canonical.
3. Follow a cheap-first startup sequence:
   - Find the first unchecked task line number.
   - Read only a small slice around it.
   - Only run `find`/`ls` if the task requires it.

### Monorepo/workspace boundary (if applicable)

If the repo is a monorepo (e.g., contains `brain/` and `website/`), Ralph should default `ROOT` to the monorepo root so RovoDev can operate on sibling directories.

## Proposed Changes

### A) `workers/ralph/PROMPT.md`: add an explicit "Orientation Guardrail" + cheap-first startup

Add a short section near the top of `workers/ralph/PROMPT.md` that:

- Prohibits broad repo scans (`find .`, `ls -R`, opening large files) unless the *selected task* requires it.
- Requires determining the first unchecked task with a single grep and reading only a 30-40 line slice around it.
- Requires stating (in one line) the inferred app root (e.g., `APP_ROOT=.`) before implementation.

### B) `workers/ralph/PROMPT.md`: add explicit guidance on "plan drift"

Add a rule:

- If the plan references paths that don't exist (e.g., `../website/`), do **not** spend an iteration exploring; instead:
  1. Report the mismatch.
  2. Propose a plan fix.
  3. Stop.

### C) `workers/ralph/loop.sh`: monorepo auto-detection for ROOT (existing content)

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

## Hash / protection workflow

`workers/ralph/PROMPT.md` is protected by a hash guard. Any change must update the corresponding hash file:

- Update `workers/ralph/PROMPT.md`
- Recompute SHA-256 and write it to `workers/ralph/.verify/prompt.sha256`

Commands (run from repo root):

```bash
sha256sum workers/ralph/PROMPT.md | awk '{print $1}' > workers/ralph/.verify/prompt.sha256
```

(Current PROMPT sha256 at time of this request: `5bb353a565f11461ecd463590211e44bcb6aea5d7db4a9c857a4a65c5fda86cc`)

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

