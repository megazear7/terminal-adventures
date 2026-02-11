**Current Objective**

Build a fully playable, terminal-based text adventure game in TypeScript that is fun, extensible, and evolves over time.

**Immediate next goal (v0.4):**
- Add simple combat system with a monster in the tunnel.
- When entering tunnel, if monster is present, trigger combat.
- Combat: player can attack or use items (if applicable).
- Monster has health, player has health.
- Win combat to proceed, lose = game over.
- Add health to GameState, monster data to rooms or separate.
- Use chalk for combat messages.
- Add Vitest tests for combat logic.

After completing the current goal: test thoroughly (`npm test` + manual `npm start`), commit with clear message, then rewrite this objective.md with the next specific, valuable improvement (e.g. "Add more rooms", "Add procedural elements", "Improve room descriptions", "Add item usage", etc.).

Always stay local-only. Never add external services.