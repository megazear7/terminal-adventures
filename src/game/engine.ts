import inquirer from 'inquirer';
import chalk from 'chalk';
import { rooms } from './rooms.js';
import { getState, updateState, saveGame, loadGame } from './state.js';

function randomDamage(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function doCombat(monster: { name: string; health: number; attack: number }) {
  let monsterHealth = monster.health;
  console.log(chalk.red(`\nA ${monster.name} appears! Combat begins!`));

  while (monsterHealth > 0) {
    const state = getState();
    console.log(chalk.yellow(`\nYour health: ${state.health} | ${monster.name} health: ${monsterHealth}`));

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you do?',
        choices: [
          { name: 'Attack', value: 'attack' },
          { name: 'Flee', value: 'flee' },
        ],
      },
    ]);

    if (action === 'flee') {
      console.log(chalk.blue('You flee back to the previous room!'));
      return false; // Fled
    }

    if (action === 'attack') {
      const damage = randomDamage(1, 3);
      monsterHealth -= damage;
      console.log(chalk.green(`You attack the ${monster.name} for ${damage} damage!`));

      if (monsterHealth <= 0) {
        console.log(chalk.green(`You defeated the ${monster.name}!`));
        return true; // Won
      }

      // Monster attacks
      const monsterDamage = randomDamage(1, monster.attack);
      updateState({ health: state.health - monsterDamage });
      console.log(chalk.red(`The ${monster.name} attacks you for ${monsterDamage} damage!`));

      if (getState().health <= 0) {
        console.log(chalk.red('You have been defeated! Game over.'));
        return 'dead'; // Dead
      }
    }
  }
}

export async function startGame() {
  console.clear();
  console.log(chalk.bold.green('=== Terminal Adventure ===\n'));

  let previousRoom = 'cave';

  while (true) {
    const state = getState();
    const room = rooms[state.currentRoom];

    console.log(chalk.bold.blue(`\n${room.name}`));
    console.log(chalk.gray(room.description));
    console.log(chalk.cyan(`Your health: ${state.health}`));

    if (room.items && room.items.length > 0) {
      console.log(chalk.yellow(`Items here: ${room.items.join(', ')}`));
    }

    if (state.currentRoom === 'treasure') {
      console.log(chalk.bold.magenta('\n🎉 You win! You found the treasure!'));
      break;
    }

    if (state.health <= 0) {
      console.log(chalk.red('\n💀 You have died. Game over.'));
      break;
    }

    // Check for monster
    if (room.monster) {
      const result = await doCombat(room.monster);
      if (result === false) { // Fled
        updateState({ currentRoom: previousRoom });
        continue;
      } else if (result === 'dead') {
        break;
      } else if (result === true) { // Won
        room.monster = undefined;
      }
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

    // Add save/load options
    choices.push({ name: 'Save game', value: 'save' });
    choices.push({ name: 'Load game', value: 'load' });

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

    if (action === 'save') {
      const { fileName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'fileName',
          message: 'Enter save file name (default: save.json):',
          default: 'save.json',
        },
      ]);
      try {
        await saveGame(fileName);
        console.log(chalk.green(`Game saved to ${fileName}`));
      } catch (error) {
        console.log(chalk.red(`Failed to save: ${(error as Error).message}`));
      }
      continue;
    }

    if (action === 'load') {
      const { fileName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'fileName',
          message: 'Enter save file name to load (default: save.json):',
          default: 'save.json',
        },
      ]);
      try {
        await loadGame(fileName);
        console.log(chalk.green(`Game loaded from ${fileName}`));
      } catch (error) {
        console.log(chalk.red(`Failed to load: ${(error as Error).message}`));
      }
      continue;
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
      previousRoom = state.currentRoom;
      updateState({ currentRoom: nextRoom });
    } else {
      console.log(chalk.red('Invalid action!'));
    }
  }
}