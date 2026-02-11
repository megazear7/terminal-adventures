import { program } from './cli/commands.js';
import { startGame } from './game/engine.js';
import { loadGame } from './game/state.js';
import { existsSync } from 'fs';

async function main() {
  const args = program.parse();
  const options = args.opts();
  const commands = args.args;

  // Auto-load from .game-state if no explicit load
  if (!options.load) {
    const autoSavePath = '.game-state/save.json';
    if (existsSync(autoSavePath)) {
      try {
        await loadGame(autoSavePath);
      } catch (error) {
        // Silently ignore auto-load errors
      }
    }
  } else {
    try {
      await loadGame(options.load);
      console.log(`Loaded game from ${options.load}`);
    } catch (error) {
      console.error(`Error loading game: ${(error as Error).message}`);
      process.exit(1);
    }
  }

  await startGame({ ...options, commands: commands.length > 0 ? commands : undefined });
}

main().catch(console.error);