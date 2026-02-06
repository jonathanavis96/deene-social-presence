#!/usr/bin/env bash
# Quick project state snapshot for Cortex

# Get absolute path to this script, then go up one level for ROOT
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
cd "$ROOT" || exit 1

echo "# {{PROJECT_NAME}} Snapshot"
echo "Generated: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Git status
echo "## Git"
if git rev-parse --git-dir &>/dev/null; then
  echo "Branch: $(git branch --show-current)"
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Status: Uncommitted changes"
  else
    echo "Status: Clean"
  fi
else
  echo "Not a git repository"
fi
echo ""

# Task summary
echo "## Tasks"

PLAN_FILE=""
if [[ -f "${ROOT}/workers/IMPLEMENTATION_PLAN.md" ]]; then
  PLAN_FILE="${ROOT}/workers/IMPLEMENTATION_PLAN.md"
elif [[ -f "${ROOT}/IMPLEMENTATION_PLAN.md" ]]; then
  PLAN_FILE="${ROOT}/IMPLEMENTATION_PLAN.md"
elif [[ -f "${ROOT}/cortex/IMPLEMENTATION_PLAN.md" ]]; then
  PLAN_FILE="${ROOT}/cortex/IMPLEMENTATION_PLAN.md"
fi

if [[ -n "$PLAN_FILE" ]]; then
  total=$(grep -cE '^\- \[[ x?]\] \*\*[0-9]' "$PLAN_FILE" 2>/dev/null || echo 0)
  done=$(grep -cE '^\- \[x\] \*\*[0-9]' "$PLAN_FILE" 2>/dev/null || echo 0)
  echo "Plan: $(basename "$(dirname "$PLAN_FILE")")/$(basename "$PLAN_FILE")"
  echo "Progress: $done/$total"
  echo ""

  # Next tasks
  echo "## Next Tasks"
  grep -E '^\- \[ \] \*\*[0-9]' "$PLAN_FILE" | head -3
  echo ""
else
  echo "Plan: (none found)"
  echo "Progress: 0/0"
  echo ""
  echo "## Next Tasks"
  echo "(no plan found)"
  echo ""
fi

# Recent commits
echo "## Recent Commits"
git log --oneline -5 2>/dev/null || echo "No commits yet"
