**Current Objective**

Build a fully playable, terminal-based text adventure game in TypeScript that is fun, extensible, and evolves over time.

**Immediate next goal (v0.5):**
- Add non-interactive CLI interface alongside the existing interactive one.
- Allow commands to be passed as arguments (e.g., `npm start go north`, `npm start take torch`).
- Create .game-state/ directory for automatic save/load (add to .gitignore).
- Auto-save game state after each command in non-interactive mode.
- Auto-load game state on startup.
- Both interactive and non-interactive modes should work with the same game engine.
- Add help command and command validation.

After completing the current goal: test thoroughly (`npm test` + manual `npm start`), commit with clear message, then rewrite this objective.md with the next specific, valuable improvement (e.g. "Add more rooms", "Add procedural elements", "Improve room descriptions", "Add item usage", etc.).

Always stay local-only. Never add external services.