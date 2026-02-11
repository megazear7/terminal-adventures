## Coding Standards

- All data structures (Room, Item, GameState, etc.) must be defined first in src/game/types.ts using Zod schemas.
- Prefer immutable updates to game state.
- Game output must go through a clean print function using chalk (no raw console.log in game logic).
- Input: Inquirer for all player choices; Commander for top-level CLI flags (--help, --debug, --new-game, etc.).
- Tests: Vitest, cover new behavior + edge cases.
- Keep files focused and well-commented.
- Conventional commits: feat:, fix:, test:, refactor:, docs: etc.