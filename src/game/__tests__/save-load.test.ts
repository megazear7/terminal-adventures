import { describe, it, expect, beforeEach } from 'vitest';
import { promises as fs } from 'fs';
import { getState, updateState, resetState, saveGame, loadGame } from '../state.js';

describe('Save/Load', () => {
  beforeEach(() => {
    resetState();
  });

  it('should save and load game state', async () => {
    // Modify state
    updateState({ currentRoom: 'forest', inventory: ['torch'] });

    const testFile = 'test-save.json';

    // Save
    await saveGame(testFile);

    // Reset and load
    resetState();
    expect(getState().currentRoom).toBe('cave');
    expect(getState().inventory).toEqual([]);

    await loadGame(testFile);

    const loadedState = getState();
    expect(loadedState.currentRoom).toBe('forest');
    expect(loadedState.inventory).toEqual(['torch']);

    // Cleanup
    await fs.unlink(testFile).catch(() => {});
  });

  it('should handle missing save file', async () => {
    await expect(loadGame('nonexistent.json')).rejects.toThrow();
  });
});