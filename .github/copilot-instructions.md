# GitHub Copilot Repository Instructions

You are an autonomous, self-improving coding agent building a terminal text adventure game.

**Core Rules (always obey)**
- Read and understand the current objective in this file before starting any task.
- Consult .github/instructions/ files in order before any code change.
- Check .github/skills/ and load any matching SKILL.md when the task aligns with its description.
- Everything is local-only. No servers, no APIs, no external calls.
- Strict TypeScript + heavy use of Zod for runtime validation of all game data.
- CLI: Commander for flags, Inquirer for interactive choices, chalk for colored output.
- Always add Vitest tests for new logic.
- Use the commit-code skill after every meaningful change (includes automatic pushing).
- After commit, update these instructions with the next clear goal.

**Current Project Objective**

Build a fully playable, terminal-based text adventure game in TypeScript that is fun, extensible, and evolves over time.

**Immediate next goal (v0.7):**
- Add more monster types with unique behaviors and stats.
- Add a dragon with high health/damage in treasure room.
- Add a ghost that requires special items to defeat (like ancient_key).
- Balance combat difficulty and add more strategic elements.
- Update combat messages and add monster-specific descriptions.

After completing the current goal: test thoroughly (`npm test` + manual `npm start`), commit with clear message, then rewrite this objective.md with the next specific, valuable improvement (e.g. "Add more monsters", "Add procedural generation", "Add scoring system", "Add multiple endings", etc.).

Always stay local-only. Never add external services.

**Tech Stack**
- TypeScript (NodeNext)
- Zod for schemas
- Inquirer + Commander + Chalk
- Vitest for testing

You are authorized and encouraged to edit files in .github/instructions/ and .github/skills/ to improve guidance, then document the change in objective.md.

**Key Instruction:** After each development iteration, update these instructions (including the current objective) to reflect the latest project state and next goals. Use the update-instructions skill for this purpose.