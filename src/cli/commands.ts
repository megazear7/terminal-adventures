import { Command } from 'commander';

export const program = new Command();

program
  .name('terminal-adventure')
  .description('Self-evolving text adventure game')
  .version('0.1.0')
  .option('--debug', 'Enable debug mode')
  .option('--load <file>', 'Load game from JSON file')
  .option('--demo', 'Run in demo mode with automatic choices')
  .argument('[commands...]', 'Commands to execute in non-interactive mode')
  .action(async (commands, options) => {
    if (options.debug) console.log('Debug mode enabled');
    // Commands and options are passed to index.ts
  });