import inquirer from 'inquirer';
import chalk from 'chalk';
import { rooms } from './rooms.js';
import { getState, updateState } from './state.js';

export async function startGame() {
  console.clear();
  console.log(chalk.bold.green('=== Terminal Adventure ===\n'));

  while (true) {
    const state = getState();
    const room = rooms[state.currentRoom];

    console.log(chalk.bold.blue(`\n${room.name}`));
    console.log(chalk.gray(room.description));

    if (room.items && room.items.length > 0) {
      console.log(chalk.yellow(`Items here: ${room.items.join(', ')}`));
    }

    if (state.currentRoom === 'treasure') {
      console.log(chalk.bold.magenta('\n🎉 You win! You found the treasure!'));
      break;
    }

    const choices = Object.keys(room.exits).map(dir => ({
      name: `Go ${dir}`,
      value: dir,
    }));

    choices.push({ name: 'Quit', value: 'quit' });

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you do?',
        choices,
      },
    ]);

    if (action === 'quit') {
      console.log(chalk.red('Goodbye!'));
      break;
    }

    const nextRoom = room.exits[action];
    if (nextRoom) {
      updateState({ currentRoom: nextRoom });
    } else {
      console.log(chalk.red('Invalid direction!'));
    }
  }
}