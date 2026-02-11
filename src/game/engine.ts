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

    // Add inventory option
    choices.push({ name: 'Check inventory', value: 'inventory' });

    // Add take options for items in room
    if (room.items && room.items.length > 0) {
      room.items.forEach(item => {
        choices.push({ name: `Take ${item}`, value: `take:${item}` });
      });
    }

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

    if (action === 'inventory') {
      const state = getState();
      if (state.inventory.length > 0) {
        console.log(chalk.cyan(`Your inventory: ${state.inventory.join(', ')}`));
      } else {
        console.log(chalk.gray('Your inventory is empty.'));
      }
      continue; // Stay in the same room
    }

    if (action.startsWith('take:')) {
      const item = action.split(':')[1];
      const itemIndex = room.items.indexOf(item);
      if (itemIndex !== -1) {
        // Remove from room
        room.items.splice(itemIndex, 1);
        // Add to inventory
        const state = getState();
        updateState({ inventory: [...state.inventory, item] });
        console.log(chalk.green(`You took the ${item}.`));
      } else {
        console.log(chalk.red('Item not found here.'));
      }
      continue;
    }

    const nextRoom = room.exits[action];
    if (nextRoom) {
      updateState({ currentRoom: nextRoom });
    } else {
      console.log(chalk.red('Invalid action!'));
    }
  }
}