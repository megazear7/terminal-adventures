import { program } from './cli/commands.js';
import { startGame } from './game/engine.js';
import { loadGame } from './game/state.js';

async function main() {
  const options = program.parse().opts();
  if (options.load) {
    try {
      await loadGame(options.load);
      console.log(`Loaded game from ${options.load}`);
    } catch (error) {
      console.error(`Error loading game: ${(error as Error).message}`);
      process.exit(1);
    }
  }
  await startGame(options);
}

main().catch(console.error);