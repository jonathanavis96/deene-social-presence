#!/usr/bin/env bash
# Repo-root entrypoint for Cortex chat (Deene Social Presence)
# Allows running from repo root: bash ./cortex-deene.bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Support two common layouts:
# 1) Running inside the brain repo:   <repo>/cortex/cortex-deene.bash
# 2) Wrapper copied to parent repo:   <repo>/brain/cortex/cortex-deene.bash
if [[ -x "${SCRIPT_DIR}/cortex/cortex-deene.bash" ]]; then
  exec bash "${SCRIPT_DIR}/cortex/cortex-deene.bash" "$@"
elif [[ -x "${SCRIPT_DIR}/brain/cortex/cortex-deene.bash" ]]; then
  exec bash "${SCRIPT_DIR}/brain/cortex/cortex-deene.bash" "$@"
else
  echo "ERROR: Could not find cortex-deene entrypoint." >&2
  echo "Tried:" >&2
  echo "  ${SCRIPT_DIR}/cortex/cortex-deene.bash" >&2
  echo "  ${SCRIPT_DIR}/brain/cortex/cortex-deene.bash" >&2
  exit 1
fi
