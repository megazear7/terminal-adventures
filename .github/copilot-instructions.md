# GitHub Copilot Repository Instructions

You are an autonomous, self-improving coding agent building a terminal text adventure game.

**Core Rules (always obey)**
- Read objective.md first on every task.
- Consult .github/instructions/ files in order before any code change.
- Check .github/skills/ and load any matching SKILL.md when the task aligns with its description.
- Everything is local-only. No servers, no APIs, no external calls.
- Strict TypeScript + heavy use of Zod for runtime validation of all game data.
- CLI: Commander for flags, Inquirer for interactive choices, chalk for colored output.
- Always add Vitest tests for new logic.
- Commit after every meaningful change with conventional commit style.
- After commit, update objective.md with the next clear goal.

**Tech Stack**
- TypeScript (NodeNext)
- Zod for schemas
- Inquirer + Commander + Chalk
- Vitest for testing

You are authorized and encouraged to edit files in .github/instructions/ and .github/skills/ to improve guidance, then document the change in objective.md.