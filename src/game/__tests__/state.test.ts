import { describe, it, expect, beforeEach } from 'vitest';
import { getState, updateState, resetState } from '../state.js';

describe('Game State', () => {
  beforeEach(() => {
    resetState();
  });

  it('should start in cave', () => {
    const state = getState();
    expect(state.currentRoom).toBe('cave');
    expect(state.inventory).toEqual([]);
  });

  it('should update current room', () => {
    updateState({ currentRoom: 'forest' });
    const state = getState();
    expect(state.currentRoom).toBe('forest');
  });

  it('should update inventory', () => {
    updateState({ inventory: ['torch'] });
    const state = getState();
    expect(state.inventory).toEqual(['torch']);
  });

  it('should reset state', () => {
    updateState({ currentRoom: 'forest', inventory: ['gold'] });
    resetState();
    const state = getState();
    expect(state.currentRoom).toBe('cave');
    expect(state.inventory).toEqual([]);
  });
});