#!/usr/bin/env bash
# add_color_suffix.sh
#
# Ensures colored logo SVGs follow the required naming convention:
#   logo-01.svg -> logo-01-color.svg
#
# This is useful after using an external PNG->SVG converter that outputs
# `logo-01.svg`, but the rest of the pipeline expects `*-color.svg` inside
# `../website/public/logos/_colored/`.
#
# Default behavior: rename in place.
#
# Usage:
#   bash scripts/add_color_suffix.sh [DIR] [--dry-run]
#
# Examples:
#   bash scripts/add_color_suffix.sh ../website/public/logos/_colored --dry-run
#   bash scripts/add_color_suffix.sh ../website/public/logos/_colored

set -euo pipefail

DIR="${1:-../website/public/logos/_colored}"
DRY_RUN=false

if [ "${2:-}" = "--dry-run" ] || [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=true
  if [ "${1:-}" = "--dry-run" ]; then
    DIR="${2:-../website/public/logos/_colored}"
  fi
fi

if [ ! -d "$DIR" ]; then
  echo "ERROR: directory not found: $DIR" >&2
  exit 1
fi

shopt -s nullglob

count=0
skipped=0

# Recursive find, but avoid spaces issues by using -print0.
while IFS= read -r -d '' f; do
  base=$(basename "$f")

  # Already correct
  if [[ "$base" == *-color.svg ]]; then
    skipped=$((skipped + 1))
    continue
  fi

  if [[ "$base" != *.svg ]]; then
    skipped=$((skipped + 1))
    continue
  fi

  new="${f%.svg}-color.svg"

  if [ -e "$new" ]; then
    echo "SKIP (exists): $new" >&2
    skipped=$((skipped + 1))
    continue
  fi

  if $DRY_RUN; then
    echo "DRY: mv '$f' '$new'"
  else
    mv "$f" "$new"
    echo "OK:  $base -> $(basename "$new")"
  fi

  count=$((count + 1))
done < <(find "$DIR" -type f -name "*.svg" -print0)

if $DRY_RUN; then
  printf "\nDry run complete. Would rename %s file(s). Skipped %s file(s).\n" "$count" "$skipped"
else
  printf "\nDone. Renamed %s file(s). Skipped %s file(s).\n" "$count" "$skipped"
fi
