**Current Objective**

Build a fully playable, terminal-based text adventure game in TypeScript that is fun, extensible, and evolves over time.

**Immediate next goal (v0.2):**
- Add inventory system: allow players to pick up items from rooms.
- Add "Take [item]" and "Inventory" options to the game menu.
- Items are removed from rooms when taken.
- Display inventory when requested.
- Update Zod schemas for Item if needed.
- Follow the add-inventory skill strictly.
- Add Vitest tests for item pickup and inventory management.

After completing the current goal: test thoroughly (`npm test` + manual `npm start`), commit with clear message, then rewrite this objective.md with the next specific, valuable improvement (e.g. "Add save/load via JSON", "Add simple combat", "Add procedural elements", "Improve room descriptions", etc.).

Always stay local-only. Never add external services.