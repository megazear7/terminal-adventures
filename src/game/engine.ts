import inquirer from 'inquirer';
import chalk from 'chalk';
import { rooms } from './rooms.js';
import { getState, updateState, saveGame, loadGame } from './state.js';

function randomDamage(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function levelUp() {
  const state = getState();
  const newLevel = state.player.level + 1;
  const newMaxXp = Math.floor(state.player.maxXp * 1.5);
  const newStrength = state.player.strength + 1;
  const newDefense = state.player.defense + 1;
  const newMaxHealth = state.player.maxHealth + 2;
  const newAbilities = [...state.player.abilities];
  if (newLevel === 2) newAbilities.push('Regeneration');
  if (newLevel === 3) newAbilities.push('Critical Strike');
  // Add more as needed

  updateState({
    player: {
      level: newLevel,
      xp: 0,
      maxXp: newMaxXp,
      strength: newStrength,
      defense: newDefense,
      maxHealth: newMaxHealth,
      abilities: newAbilities,
    },
    health: Math.min(state.health + 2, newMaxHealth), // Heal on level up, but not over max
  });
  console.log(chalk.green(`\n🎉 Level up! You are now level ${newLevel}!`));
  console.log(chalk.cyan(`Strength: ${newStrength}, Defense: ${newDefense}, Max Health: ${newMaxHealth}`));
  if (newAbilities.length > state.player.abilities.length) {
    console.log(chalk.magenta(`New ability unlocked: ${newAbilities[newAbilities.length - 1]}`));
  }
}

function getRoomDescription(room: any, torchLit: boolean): string {
  if (room.requiresLight && !torchLit) {
    return "It's too dark to see anything clearly.";
  }
  return room.description;
}

function canSeeItems(room: any, torchLit: boolean): boolean {
  return !room.requiresLight || torchLit;
}

async function processCommands(commands: string[]) {
  let previousRoom = 'cave';

  for (const command of commands) {
    const state = getState();
    const room = rooms[state.currentRoom];

    console.log(chalk.bold.blue(`\n${room.name}`));
    console.log(chalk.gray(getRoomDescription(room, state.torchLit)));
    console.log(chalk.cyan(`Your health: ${state.health}/${state.player.maxHealth} | Level: ${state.player.level} | XP: ${state.player.xp}/${state.player.maxXp}`));

    if (canSeeItems(room, state.torchLit) && room.items && room.items.length > 0) {
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
      const result = await doCombat(room.monster, { demo: true }); // Always attack in non-interactive
      if (result === false) { // Fled
        updateState({ currentRoom: previousRoom });
        continue;
      } else if (result === 'dead') {
        break;
      } else if (result === true) { // Won
        room.monster = undefined;
      }
    }

    // Check for different endings
    if (state.currentRoom === 'treasure') {
      const hasAncientKey = state.inventory.includes('ancient_key');
      const hasBinoculars = state.inventory.includes('binoculars');
      const hasScroll = state.inventory.includes('ancient_scroll');
      
      if (hasAncientKey && hasBinoculars && hasScroll) {
        console.log(chalk.bold.magenta('\n🏆 LEGENDARY EXPLORER! 🏆'));
        console.log(chalk.magenta('You have collected all the ancient artifacts and conquered the mountain peak!'));
        console.log(chalk.magenta('Your name will be remembered in legends for generations!'));
      } else if (hasAncientKey && hasBinoculars) {
        console.log(chalk.bold.green('\n🎉 MASTER EXPLORER! 🎉'));
        console.log(chalk.green('You conquered the mountain and defeated the ancient guardian!'));
        console.log(chalk.green('The treasure is yours, and the valley is at peace.'));
      } else {
        console.log(chalk.bold.yellow('\n🎉 You win! You found the treasure!'));
        console.log(chalk.yellow('But there may be more adventures waiting in this vast world...'));
      }
      break;
    }

    if (state.currentRoom === 'secret') {
      console.log(chalk.bold.cyan('\n🔍 ANCIENT SCHOLAR! 🔍'));
      console.log(chalk.cyan('You discovered the lost civilization\'s secrets!'));
      console.log(chalk.cyan('The ancient scroll reveals the location of even greater treasures...'));
      break;
    }

    // Process command
    const action = parseCommand(command);
    if (!action) {
      console.log(chalk.red(`Unknown command: ${command}`));
      console.log(chalk.gray('Available commands: go <direction>, take <item>, use <item>, craft, inventory, save, load, quit'));
      continue;
    }

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
      continue;
    }

    if (action === 'save') {
      await saveGame('.game-state/save.json');
      console.log(chalk.green('Game saved to .game-state/save.json'));
      continue;
    }

    if (action === 'load') {
      await loadGame('.game-state/save.json');
      console.log(chalk.green('Game loaded from .game-state/save.json'));
      continue;
    }

    if (action.startsWith('take:')) {
      const item = action.split(':')[1];
      const itemIndex = room.items.indexOf(item);
      if (itemIndex !== -1) {
        room.items.splice(itemIndex, 1);
        updateState({ inventory: [...state.inventory, item] });
        console.log(chalk.green(`You took the ${item}.`));
      } else {
        console.log(chalk.red('Item not found here.'));
      }
      continue;
    }

    if (action.startsWith('use:')) {
      const item = action.split(':')[1];
      if (state.inventory.includes(item)) {
        if (item === 'torch') {
          updateState({ torchLit: !state.torchLit });
          console.log(chalk.yellow(state.torchLit ? 'You light the torch. The area brightens!' : 'You extinguish the torch.'));
        } else {
          console.log(chalk.gray(`You can't use the ${item} here.`));
        }
      } else {
        console.log(chalk.red(`You don't have a ${item}.`));
      }
      continue;
    }

    if (action === 'craft') {
      const inventory = state.inventory;
      if (inventory.includes('wood') && inventory.includes('stone')) {
        updateState({ inventory: inventory.filter(i => i !== 'wood' && i !== 'stone').concat('axe') });
        console.log(chalk.green('You crafted an axe using wood and stone!'));
      } else {
        console.log(chalk.gray('You need wood and stone to craft an axe.'));
      }
      continue;
    }

    // Handle special movement cases
    if (action === 'south' && state.currentRoom === 'river') {
      if (state.inventory.includes('rope')) {
        console.log(chalk.blue('You use the rope to secure yourself and cross the river safely.'));
        previousRoom = state.currentRoom;
        updateState({ currentRoom: 'mountain' });
      } else {
        console.log(chalk.red('The river is too swift and deep to cross without proper equipment. You need something to help you cross safely.'));
      }
      continue;
    }

    // Handle movement
    const nextRoom = room.exits[action];
    if (nextRoom) {
      previousRoom = state.currentRoom;
      updateState({ currentRoom: nextRoom });
    } else {
      console.log(chalk.red('Invalid direction!'));
    }
  }

  // Auto-save after commands
  await saveGame('.game-state/save.json');
}

function parseCommand(command: string): string | null {
  const parts = command.toLowerCase().split(' ');
  const cmd = parts[0];

  if (cmd === 'go' && parts[1]) {
    return parts[1];
  }
  if (cmd === 'take' && parts[1]) {
    return `take:${parts[1]}`;
  }
  if (cmd === 'use' && parts[1]) {
    return `use:${parts[1]}`;
  }
  if (['inventory', 'save', 'load', 'quit', 'craft'].includes(cmd)) {
    return cmd;
  }
  if (['north', 'south', 'east', 'west'].includes(cmd)) {
    return cmd;
  }

  return null;
}

function getDemoChoice(choices: any[], state: any, room: any): string {
  // Simple demo logic
  if (room.items && room.items.includes('torch')) {
    return 'take:torch';
  }
  if (state.currentRoom === 'cave' && choices.some(c => c.value === 'east')) {
    return 'east';
  }
  if (state.currentRoom === 'tunnel' && choices.some(c => c.value === 'west')) {
    return 'west';
  }
  if (state.currentRoom === 'cave' && choices.some(c => c.value === 'north')) {
    return 'north';
  }
  if (state.currentRoom === 'forest' && choices.some(c => c.value === 'inventory')) {
    return 'inventory';
  }
  if (state.currentRoom === 'forest' && choices.some(c => c.value === 'south')) {
    return 'south';
  }
  if (state.currentRoom === 'cave' && choices.some(c => c.value === 'east')) {
    return 'east';
  }
  if (state.currentRoom === 'tunnel' && choices.some(c => c.value === 'east')) {
    return 'east';
  }
  return 'quit'; // Default to quit
}

async function doCombat(monster: { name: string; health: number; attack: number }, options: { demo?: boolean } = {}) {
  let monsterHealth = monster.health;
  
  // Monster-specific appearance messages
  if (monster.name === 'Ancient Dragon') {
    console.log(chalk.red(`\n🐉 A massive ${monster.name} blocks your path! Its scales gleam like molten gold and smoke curls from its nostrils. Combat begins!`));
  } else if (monster.name === 'Ghost') {
    console.log(chalk.magenta(`\n👻 A translucent ${monster.name} emerges from the shadows! Its ethereal form flickers with otherworldly energy. Combat begins!`));
  } else {
    console.log(chalk.red(`\nA ${monster.name} appears! Combat begins!`));
  }

  while (monsterHealth > 0) {
    const state = getState();
    console.log(chalk.yellow(`\nYour health: ${state.health} | ${monster.name} health: ${monsterHealth}`));

    const { action } = options.demo 
      ? { action: 'attack' } // Always attack in demo
      : await inquirer.prompt([
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
      let damage = randomDamage(1, state.player.strength);
      
      // Special monster behaviors
      if (monster.name === 'Ghost') {
        if (state.inventory.includes('ancient_key')) {
          console.log(chalk.magenta('The ancient key glows brightly! The ghost becomes vulnerable!'));
        } else {
          damage = 0; // Ghost is immune without ancient_key
          console.log(chalk.gray('Your attack passes through the ghost harmlessly. You need something special to defeat it!'));
        }
      }
      
      monsterHealth -= damage;
      if (damage > 0) {
        console.log(chalk.green(`You attack the ${monster.name} for ${damage} damage!`));
      }

      if (monsterHealth <= 0) {
        if (monster.name === 'Ghost') {
          console.log(chalk.magenta('The ghost lets out a final wail and dissipates into mist!'));
        } else {
          console.log(chalk.green(`You defeated the ${monster.name}!`));
        }
        // Gain XP
        const xpGain = monster.health + monster.attack;
        const newXp = state.player.xp + xpGain;
        updateState({ player: { ...state.player, xp: newXp } });
        console.log(chalk.blue(`You gained ${xpGain} XP!`));
        // Check for level up
        let currentState = getState();
        while (currentState.player.xp >= currentState.player.maxXp) {
          levelUp();
          currentState = getState();
        }
        return true; // Won
      }

      // Monster attacks
      const rawDamage = randomDamage(1, monster.attack);
      const monsterDamage = Math.max(1, rawDamage - state.player.defense);
      updateState({ health: state.health - monsterDamage });
      console.log(chalk.red(`The ${monster.name} attacks you for ${monsterDamage} damage!`));

      if (getState().health <= 0) {
        console.log(chalk.red('You have been defeated! Game over.'));
        return 'dead'; // Dead
      }
    }
  }
}

export async function startGame(options: { demo?: boolean; commands?: string[] } = {}) {
  console.clear();
  console.log(chalk.bold.green('=== Terminal Adventure ===\n'));

  // Handle non-interactive commands
  if (options.commands && options.commands.length > 0) {
    await processCommands(options.commands);
    return;
  }

  // Interactive mode
  let previousRoom = 'cave';

  while (true) {
    const state = getState();
    const room = rooms[state.currentRoom];

    console.log(chalk.bold.blue(`\n${room.name}`));
    console.log(chalk.gray(getRoomDescription(room, state.torchLit)));
    console.log(chalk.cyan(`Your health: ${state.health}/${state.player.maxHealth} | Level: ${state.player.level} | XP: ${state.player.xp}/${state.player.maxXp}`));

    if (canSeeItems(room, state.torchLit) && room.items && room.items.length > 0) {
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
      const result = await doCombat(room.monster, options);
      if (result === false) { // Fled
        updateState({ currentRoom: previousRoom });
        continue;
      } else if (result === 'dead') {
        break;
      } else if (result === true) { // Won
        room.monster = undefined;
      }
    }

    // Check for different endings
    if (state.currentRoom === 'treasure') {
      const hasAncientKey = state.inventory.includes('ancient_key');
      const hasBinoculars = state.inventory.includes('binoculars');
      const hasScroll = state.inventory.includes('ancient_scroll');
      
      if (hasAncientKey && hasBinoculars && hasScroll) {
        console.log(chalk.bold.magenta('\n🏆 LEGENDARY EXPLORER! 🏆'));
        console.log(chalk.magenta('You have collected all the ancient artifacts and conquered the mountain peak!'));
        console.log(chalk.magenta('Your name will be remembered in legends for generations!'));
      } else if (hasAncientKey && hasBinoculars) {
        console.log(chalk.bold.green('\n🎉 MASTER EXPLORER! 🎉'));
        console.log(chalk.green('You conquered the mountain and defeated the ancient guardian!'));
        console.log(chalk.green('The treasure is yours, and the valley is at peace.'));
      } else {
        console.log(chalk.bold.yellow('\n🎉 You win! You found the treasure!'));
        console.log(chalk.yellow('But there may be more adventures waiting in this vast world...'));
      }
      break;
    }

    if (state.currentRoom === 'secret') {
      console.log(chalk.bold.cyan('\n🔍 ANCIENT SCHOLAR! 🔍'));
      console.log(chalk.cyan('You discovered the lost civilization\'s secrets!'));
      console.log(chalk.cyan('The ancient scroll reveals the location of even greater treasures...'));
      break;
    }

    const choices = Object.keys(room.exits).map(dir => ({
      name: `Go ${dir}`,
      value: dir,
    }));

    // Add inventory option
    choices.push({ name: 'Check inventory', value: 'inventory' });

    // Add take options for items in room
    if (canSeeItems(room, state.torchLit) && room.items && room.items.length > 0) {
      room.items.forEach(item => {
        choices.push({ name: `Take ${item}`, value: `take:${item}` });
      });
    }

    // Add use options for items in inventory
    if (state.inventory.length > 0) {
      state.inventory.forEach(item => {
        choices.push({ name: `Use ${item}`, value: `use:${item}` });
      });
    }

    // Add save/load options
    choices.push({ name: 'Save game', value: 'save' });
    choices.push({ name: 'Load game', value: 'load' });

    choices.push({ name: 'Quit', value: 'quit' });

    const { action } = options.demo 
      ? { action: getDemoChoice(choices, state, room) }
      : await inquirer.prompt([
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
      if (options.demo) {
        await saveGame('demo-save.json');
        console.log(chalk.green('Game saved to demo-save.json'));
      } else {
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
      }
      continue;
    }

    if (action === 'load') {
      if (options.demo) {
        // Skip load in demo
        console.log(chalk.gray('Load skipped in demo mode'));
      } else {
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

    if (action.startsWith('use:')) {
      const item = action.split(':')[1];
      const state = getState();
      if (state.inventory.includes(item)) {
        if (item === 'torch') {
          updateState({ torchLit: !state.torchLit });
          console.log(chalk.yellow(state.torchLit ? 'You light the torch. The area brightens!' : 'You extinguish the torch.'));
        } else {
          console.log(chalk.gray(`You can't use the ${item} here.`));
        }
      } else {
        console.log(chalk.red(`You don't have a ${item}.`));
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