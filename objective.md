**Current Objective**

Build a fully playable, terminal-based text adventure game in TypeScript that is fun, extensible, and evolves over time.

**Immediate next goal (v0.3):**
- Add save/load functionality using JSON files.
- Add "Save game" and "Load game" options to the menu.
- Save current game state (room, inventory) to a file.
- Load game state from file on startup or via menu.
- Handle file not found gracefully.
- Add Commander flag --load <file> to load a specific save.
- Update CLI commands to support save/load.
- Add Vitest tests for save/load logic.

After completing the current goal: test thoroughly (`npm test` + manual `npm start`), commit with clear message, then rewrite this objective.md with the next specific, valuable improvement (e.g. "Add simple combat", "Add procedural elements", "Improve room descriptions", "Add more rooms", etc.).

Always stay local-only. Never add external services.