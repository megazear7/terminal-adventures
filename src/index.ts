import { program } from './cli/commands.js';
import { startGame } from './game/engine.js';

async function main() {
  program.parse();
  await startGame();
}

main().catch(console.error);