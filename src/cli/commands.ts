import { Command } from 'commander';

export const program = new Command();

program
  .name('terminal-adventure')
  .description('Self-evolving text adventure game')
  .version('0.1.0')
  .option('--debug', 'Enable debug mode')
  .option('--load <file>', 'Load game from JSON file')
  .option('--demo', 'Run in demo mode with automatic choices')
  .action(async (options) => {
    if (options.debug) console.log('Debug mode enabled');
    // Game start is handled in index.ts
  });