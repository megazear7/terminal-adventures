import { promises as fs } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { GameState, GameStateSchema, PlayerSchema } from './types.js';
import { rooms } from './rooms.js';

let state: GameState = {
  currentRoom: 'cave',
  inventory: [],
  roomItems: {},
  health: 10,
  torchLit: false,
  player: PlayerSchema.parse({}),
};

export function getState(): GameState {
  return { ...state };
}

export function updateState(newState: Partial<GameState>) {
  state = GameStateSchema.parse({ ...state, ...newState });
}

export function resetState() {
  // Initialize roomItems from rooms
  const initialRoomItems: Record<string, string[]> = {};
  for (const [id, room] of Object.entries(rooms)) {
    initialRoomItems[id] = [...(room.items || [])];
  }
  state = { currentRoom: 'cave', inventory: [], roomItems: initialRoomItems, health: 10, torchLit: false, player: PlayerSchema.parse({}) };
  // Also set the rooms items
  for (const [id, items] of Object.entries(initialRoomItems)) {
    rooms[id].items = [...items];
  }
  // Set health to maxHealth
  updateState({ health: state.player.maxHealth });
}

export async function saveGame(filePath: string = '.game-state/save.json') {
  const stateToSave = getState();
  // Update roomItems from current rooms
  const currentRoomItems: Record<string, string[]> = {};
  for (const [id, room] of Object.entries(rooms)) {
    currentRoomItems[id] = [...(room.items || [])];
  }
  stateToSave.roomItems = currentRoomItems;
  await mkdir(dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(stateToSave, null, 2));
}

export async function loadGame(filePath: string = '.game-state/save.json') {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const loadedState = GameStateSchema.parse(JSON.parse(data));
    state = loadedState;
    // Restore room items
    for (const [id, items] of Object.entries(loadedState.roomItems)) {
      if (rooms[id]) {
        rooms[id].items = [...items];
      }
    }
  } catch (error) {
    throw new Error(`Failed to load game: ${(error as Error).message}`);
  }
}