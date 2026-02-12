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

  it('should start with default player stats', () => {
    const state = getState();
    expect(state.player.level).toBe(1);
    expect(state.player.xp).toBe(0);
    expect(state.player.maxXp).toBe(100);
    expect(state.player.strength).toBe(5);
    expect(state.player.defense).toBe(2);
    expect(state.player.maxHealth).toBe(10);
    expect(state.player.abilities).toEqual([]);
  });

  it('should update player stats', () => {
    updateState({ player: { level: 2, xp: 50, maxXp: 100, strength: 5, defense: 2, maxHealth: 10, abilities: [] } });
    const state = getState();
    expect(state.player.level).toBe(2);
    expect(state.player.xp).toBe(50);
  });
});