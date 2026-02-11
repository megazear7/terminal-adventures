**Current Objective**

Build a fully playable, terminal-based text adventure game in TypeScript that is fun, extensible, and evolves over time.

**Immediate next goal (v0.1):**
- Implement a minimal but complete game with 3 interconnected rooms.
- Player starts in "Cave".
- Support navigation via Inquirer choices (directions as options).
- Use chalk for colored output.
- Win condition: reach the "Treasure Room".
- Use Zod schemas for all game data (Room, GameState).
- Follow all instructions in .github/copilot-instructions.md and .github/instructions/.
- If a relevant skill in .github/skills/ matches the task, load and follow it strictly.

After completing the current goal: test thoroughly (`npm test` + manual `npm start`), commit with clear message, then rewrite this objective.md with the next specific, valuable improvement (e.g. "Add inventory system and item pickup", "Add save/load via JSON", "Add simple combat", "Add procedural elements", etc.).

Always stay local-only. Never add external services.