#!/usr/bin/env bash
# cortex/cortex-deene.bash - Interactive chat with Cortex for Deene Social Presence

set -euo pipefail

# Resolve script directory
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
SCRIPT_DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
# brain repo root (this script lives in brain/cortex)
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# If this brain repo sits inside a larger mono-folder (e.g. /deene-social) and
# that folder contains a sibling website/ app, run RovoDev from the parent so
# tooling can access both brain/ and website/.
WORKSPACE_ROOT="$PROJECT_ROOT"
PARENT_ROOT="$(cd "${PROJECT_ROOT}/.." && pwd)"
if [[ -d "${PARENT_ROOT}/website" && -d "${PARENT_ROOT}/brain" ]]; then
  WORKSPACE_ROOT="$PARENT_ROOT"
fi

echo "[cortex-deene] workspace root: ${WORKSPACE_ROOT}" >&2

# Keep prompt generation anchored to brain/, but run the chat from WORKSPACE_ROOT.
cd "${PROJECT_ROOT}"

# Colors
readonly CYAN='\033[0;36m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m'

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}🧠 Cortex Interactive Chat${NC}"
echo -e "${CYAN}   Deene Social Presence${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

usage() {
  echo "Usage: bash cortex/cortex-deene.bash [OPTIONS]"
  echo ""
  echo "Cortex Interactive Chat - Direct conversation with the project manager."
  echo ""
  echo "Options:"
  echo "  --help, -h           Show this help"
  echo "  --model MODEL        Override model (gpt52, codex, opus, sonnet, auto)"
  echo "  --print-config       Build and print the generated acli config, then exit (no chat)"
  echo ""

  echo "Examples:"
  echo "  bash cortex/cortex-deene.bash              # Start chat"
  echo "  bash cortex/cortex-deene.bash --model opus # Chat with specific model"
  echo ""
  echo "Use this for:"
  echo "  - Asking questions about the project"
  echo "  - Getting guidance on tasks"
  echo "  - Discussing design decisions"
  echo "  - Quick consultations"
  echo ""
  echo "For automated planning: bash cortex/one-shot.sh"
  echo "To run Ralph (execution): bash loop.sh"
}

MODEL_ARG="gpt52" # Default to GPT-5.2 for Cortex
PRINT_CONFIG=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h | --help)
      usage
      exit 0
      ;;
    --model)
      MODEL_ARG="${2:-}"
      shift 2
      ;;
    --print-config)
      PRINT_CONFIG=true
      shift
      ;;
    *)
      echo "Unknown: $1" >&2
      usage
      exit 2
      ;;
  esac
done

RESOLVED_MODEL=""
case "$MODEL_ARG" in
  opus) RESOLVED_MODEL="anthropic.claude-opus-4-5-20251101-v1:0" ;;
  gpt52 | gpt-5.2 | gpt5.2) RESOLVED_MODEL="gpt-5.2" ;;
  codex | gpt-5.2-codex) RESOLVED_MODEL="gpt-5.2-codex" ;;
  sonnet) RESOLVED_MODEL="anthropic.claude-sonnet-4-5-20250929-v1:0" ;;
  auto) RESOLVED_MODEL="" ;;
  *) RESOLVED_MODEL="$MODEL_ARG" ;;
esac

echo ""
echo -e "${YELLOW}Generating context snapshot...${NC}"
echo ""
SNAPSHOT_OUTPUT=$(bash "${SCRIPT_DIR}/snapshot.sh")

# Build system prompt with project context
NEURONS_CONTENT=""
if [[ -f "${PROJECT_ROOT}/NEURONS.md" ]]; then
  NEURONS_CONTENT=$(cat "${PROJECT_ROOT}/NEURONS.md")
elif [[ -f "${PROJECT_ROOT}/workers/ralph/NEURONS.md" ]]; then
  NEURONS_CONTENT=$(cat "${PROJECT_ROOT}/workers/ralph/NEURONS.md")
elif [[ -f "${PROJECT_ROOT}/workers/NEURONS.md" ]]; then
  NEURONS_CONTENT=$(cat "${PROJECT_ROOT}/workers/NEURONS.md")
else
  NEURONS_CONTENT="# NEURONS.md not found\n\nCreate it (or generate it) to give Cortex a repo map."
fi

CORTEX_SYSTEM_PROMPT=$(
  cat <<EOF
$(cat "${SCRIPT_DIR}/AGENTS.md")

---

${NEURONS_CONTENT}

---

$(cat "${SCRIPT_DIR}/CORTEX_SYSTEM_PROMPT.md")

---

$(cat "${SCRIPT_DIR}/THOUGHTS.md")

---

# Current Repository State

${SNAPSHOT_OUTPUT}

---

# Chat Mode Instructions

You are now in **chat mode**. The user wants to have a direct conversation with you.

**Do NOT:**
- Automatically start a planning session
- Update files unless explicitly asked
- Execute the full planning workflow

**DO:**
- Answer questions about the Deene Social Presence project
- Provide guidance and recommendations when asked
- Help the user understand current state and next steps
- Be conversational and helpful
- Wait for user input and respond naturally

**To run Ralph (execution):** User runs \`bash loop.sh\` from project root

The user will now type their questions. Engage in a natural conversation.
EOF
)

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}Starting Cortex Chat...${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${GREEN}💬 You can now chat with Cortex!${NC}"
echo -e "${GREEN}📋 Cortex has full context of the Deene Social Presence project.${NC}"
echo -e "${GREEN}🚪 Type 'exit' or press Ctrl+C to end the session.${NC}"
echo ""

CONFIG_FILE="/tmp/cortex_config_$$_$(date +%s).yml"

cat >"$CONFIG_FILE" <<EOF
version: 1
agent:
  additionalSystemPrompt: |
$(while IFS= read -r line; do
  echo "    $line"
done <<<"$CORTEX_SYSTEM_PROMPT")
  streaming: true
  temperature: 0.3
EOF

if [[ -n "$RESOLVED_MODEL" ]]; then
  echo "  modelId: ${RESOLVED_MODEL}" >>"$CONFIG_FILE"
else
  echo "  modelId: auto" >>"$CONFIG_FILE"
fi

if [[ "$PRINT_CONFIG" == "true" ]]; then
  cat "$CONFIG_FILE"
  rm -f "$CONFIG_FILE"
  exit 0
fi

(
  cd "$WORKSPACE_ROOT"
  LOGFIRE_DISABLE=1 acli rovodev run --config-file "$CONFIG_FILE" --yolo
)
EXIT_CODE=$?

rm -f "$CONFIG_FILE"

echo ""
echo -e "${CYAN}========================================${NC}"
if [[ $EXIT_CODE -eq 0 ]]; then
  echo -e "${GREEN}✓ Chat session ended${NC}"
else
  echo -e "${YELLOW}⚠ Chat session ended with code ${EXIT_CODE}${NC}"
fi
echo -e "${CYAN}========================================${NC}"

exit $EXIT_CODE
