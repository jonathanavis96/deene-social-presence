# Brain Setup - Deene Social Presence

This document describes the Cortex and Ralph infrastructure setup for the deene-social project.

## Overview

This project now has AI-assisted development capabilities through the Brain system:

- **Cortex**: Quick ideation and planning mode
- **Ralph**: Systematic development with validation loops

## Directory Structure

```text
deene-social/
├── cortex/                    # Cortex planning helpers
│   ├── cortex-deene.bash     # Project-specific entrypoint
│   ├── AGENTS.md             # Agent behaviors
│   ├── CORTEX_SYSTEM_PROMPT.md
│   ├── DECISIONS.md          # Architecture decisions
│   ├── GAP_CAPTURE.md        # Gap detection
│   ├── IMPLEMENTATION_PLAN.md
│   ├── THOUGHTS.md           # Strategic thinking
│   └── *.sh                  # Helper scripts
│
├── workers/
│   ├── ralph/                # Ralph development loop
│   │   ├── loop.sh          # Main development loop
│   │   ├── pr-batch.sh      # PR generation
│   │   ├── verifier.sh      # Validation
│   │   ├── PROMPT.md        # Ralph instructions
│   │   ├── VALIDATION_CRITERIA.md
│   │   ├── NEURONS.md       # Project context
│   │   ├── THOUGHTS.md      # Strategic thinking
│   │   ├── THUNK.md         # Task log
│   │   ├── AGENTS.md        # Project-specific behaviors
│   │   └── RALPH.md         # Ralph documentation
│   │
│   └── shared/              # Shared utilities
│       ├── common.sh
│       ├── cache.sh
│       ├── verifier_common.sh
│       └── filter_acli_errors.sh
│
├── brain/
│   └── skills/              # Shared knowledge base
│
├── NEURONS.md               # Root-level project context
└── docs/
    └── BRAIN_SETUP.md       # This file
```

## Getting Started

### Using Cortex (Planning Mode)

For quick planning and ideation:

```bash
cd cortex
bash cortex-deene.bash
```

Cortex is great for:

- Brainstorming features
- Architecture discussions
- Quick prototypes
- Gathering requirements

### Using Ralph (Development Mode)

For systematic development with validation:

```bash
cd workers/ralph
bash loop.sh --iterations 5
```

Ralph provides:

- Structured development loop
- Automatic validation
- Task tracking (THUNK system)
- Gap detection and pattern mining

### Creating Pull Requests

When ready to merge work to main:

```bash
cd workers/ralph
bash pr-batch.sh
```

## Workflow

**Recommended Development Flow:**

1. **Plan** in Cortex mode (`cortex/cortex-deene.bash`)
2. **Develop** in Ralph mode (`workers/ralph/loop.sh`)
3. **Validate** automatically through Ralph's verification
4. **Create PR** using `pr-batch.sh`
5. **Merge** to main branch

**Branch Strategy:**

- `main`: Production-ready code
- `deene-social-work`: Active development
- Always work on the work branch, never directly on main

## Key Files

### NEURONS.md

Contains project context, tech stack, and architecture information. Helps AI understand the project structure.

### THOUGHTS.md

Strategic thinking, architecture decisions, future considerations, and technical debt awareness.

### THUNK.md

Append-only log of completed tasks. Tracks project evolution through "eras".

### AGENTS.md

Project-specific agent behaviors, code style preferences, and development guidelines.

## Monitoring Tools

**👤 For Human Operators:**

These scripts are interactive monitoring tools designed for humans to check progress. Run them in your terminal:

### Current Tasks

```bash
cd workers/ralph
bash current_ralph_tasks.sh
```

### Completed Tasks

```bash
cd workers/ralph
bash thunk_ralph_tasks.sh
```

**🤖 Note for AI Agents:**  
DO NOT run `current_ralph_tasks.sh` or `thunk_ralph_tasks.sh` - they are interactive/blocking tools. AI agents should read `workers/IMPLEMENTATION_PLAN.md` and `workers/ralph/THUNK.md` directly using grep/sed/tail.

## Configuration

### Repository Info

- **Repository:** deene-social
- **Work Branch:** deene-social-work
- **Main Branch:** main

### Tech Stack

- React 18.3 + TypeScript
- Vite 5.4
- shadcn-ui components
- Tailwind CSS
- React Router DOM

## Brain Skills Access

This project has access to the shared `skills/` knowledge base, which contains:

- Best practices and patterns
- Domain-specific expertise
- Common solutions to problems
- Cross-project learnings

## Notes

- The Brain infrastructure is optional - the project works standalone
- All Brain files are in `cortex/`, `workers/`, and `brain/` directories
- The main codebase in `src/` is unchanged and fully independent
- Brain tools enhance development but don't change the core application

## Next Steps

1. Review `NEURONS.md` and `THOUGHTS.md` for project understanding
2. Update `workers/IMPLEMENTATION_PLAN.md` with your development goals
3. Start a Ralph loop: `cd workers/ralph && bash loop.sh --iterations 5`
4. Monitor progress (humans) with `current_ralph_tasks.sh` and `thunk_ralph_tasks.sh`

---

**Setup Completed:** 2026-01-30  
**Brain Version:** Based on brain/templates system
