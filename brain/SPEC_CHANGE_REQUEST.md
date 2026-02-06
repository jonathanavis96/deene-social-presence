# Spec Change Request - AC.rules Path Correction

## Problem

The `workers/ralph/rules/AC.rules` file contains incorrect relative paths that point to the wrong directory level.

**Current paths in AC.rules:**

- `../../src` → resolves to `/home/grafe/code/src` (WRONG)
- `../../public` → resolves to `/home/grafe/code/public` (WRONG)
- `../../.gitignore` → resolves to `/home/grafe/code/.gitignore` (WRONG)
- `../../package.json` → resolves to `/home/grafe/code/package.json` (WRONG)

**Actual project structure:**

- Repository root: `/home/grafe/code/deene-social/`
- Brain location: `/home/grafe/code/deene-social/brain/`
- Ralph location: `/home/grafe/code/deene-social/brain/workers/ralph/`
- Website files: `/home/grafe/code/deene-social/website/src`, `/home/grafe/code/deene-social/website/public`, etc.

**Required paths from `workers/ralph/`:**

- `../../../.gitignore` → `/home/grafe/code/deene-social/.gitignore` (EXISTS)
- `../../../website/src` → `/home/grafe/code/deene-social/website/src` (EXISTS)
- `../../../website/public` → `/home/grafe/code/deene-social/website/public` (EXISTS)
- `../../../website/package.json` → `/home/grafe/code/deene-social/website/package.json` (EXISTS)

## Affected Rules

1. **Structure.Dirs.1** - src/ directory check
2. **Structure.Dirs.2** - public/ directory check
3. **Structure.Gitignore.1** - .gitignore check
4. **Syntax.JSON.1** - package.json validation

## Requested Changes

Update `workers/ralph/rules/AC.rules`:

```ini
[Structure.Dirs.1]
mode=auto
gate=block
desc="src/ directory exists at project root"
cmd="test -d ../../../website/src && echo yes"
expect_stdout=yes

[Structure.Dirs.2]
mode=auto
gate=block
desc="public/ directory exists"
cmd="test -d ../../../website/public && echo yes"
expect_stdout=yes

[Structure.Gitignore.1]
mode=auto
gate=block
desc=".gitignore exists"
cmd="test -f ../../../.gitignore && echo yes"
expect_stdout=yes

[Syntax.JSON.1]
mode=auto
gate=block
desc="package.json is valid JSON"
cmd="jq '.' ../../../website/package.json >/dev/null 2>&1 && echo valid"
expect_stdout=valid
```

## Verification

After the change, these commands from `workers/ralph/` should succeed:

```bash
test -d ../../../website/src && echo yes          # yes
test -d ../../../website/public && echo yes       # yes
test -f ../../../.gitignore && echo yes           # yes
jq '.' ../../../website/package.json >/dev/null && echo valid  # valid
```

## Impact

- Unblocks Ralph loop execution
- Fixes 4 failing AC rules
- No functional changes to validation logic, only path corrections

## Priority

**CRITICAL** - Ralph cannot proceed with any tasks until these AC failures are resolved.
