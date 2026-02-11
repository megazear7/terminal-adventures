import { GameState, GameStateSchema } from './types.js';

let state: GameState = {
  currentRoom: 'cave',
  inventory: [],
};

export function getState(): GameState {
  return { ...state };
}

export function updateState(newState: Partial<GameState>) {
  state = GameStateSchema.parse({ ...state, ...newState });
}

export function resetState() {
  state = { currentRoom: 'cave', inventory: [] };
}