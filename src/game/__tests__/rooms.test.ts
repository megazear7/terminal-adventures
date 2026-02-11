import { describe, it, expect } from 'vitest';
import { rooms } from '../rooms.js';

describe('Rooms', () => {
  it('should have all required rooms', () => {
    expect(rooms.cave).toBeDefined();
    expect(rooms.forest).toBeDefined();
    expect(rooms.tunnel).toBeDefined();
    expect(rooms.treasure).toBeDefined();
    expect(rooms.clearing).toBeDefined();
    expect(rooms.river).toBeDefined();
    expect(rooms.mountain).toBeDefined();
    expect(rooms.peak).toBeDefined();
    expect(rooms.secret).toBeDefined();
  });

  it('should have correct cave structure', () => {
    const cave = rooms.cave;
    expect(cave.id).toBe('cave');
    expect(cave.name).toBe('Dark Cave');
    expect(cave.exits).toEqual({ north: 'forest', east: 'tunnel', south: 'cavern' });
    expect(cave.items).toEqual(['torch']);
  });

  it('should have correct treasure room', () => {
    const treasure = rooms.treasure;
    expect(treasure.id).toBe('treasure');
    expect(treasure.name).toBe('Treasure Room');
    expect(treasure.exits).toEqual({ west: 'tunnel' });
    expect(treasure.items).toEqual(['gold']);
    expect(treasure.monster).toEqual({ name: 'Ancient Dragon', health: 20, attack: 5 });
  });

  it('should have correct hidden chamber', () => {
    const hidden = rooms.hidden;
    expect(hidden.id).toBe('hidden');
    expect(hidden.name).toBe('Hidden Chamber');
    expect(hidden.exits).toEqual({ west: 'cavern' });
    expect(hidden.items).toEqual(['ancient_key']);
    expect(hidden.monster).toEqual({ name: 'Ghost', health: 10, attack: 3 });
    expect(hidden.requiresLight).toBe(true);
  });

  it('should have correct forest clearing', () => {
    const clearing = rooms.clearing;
    expect(clearing.id).toBe('clearing');
    expect(clearing.name).toBe('Forest Clearing');
    expect(clearing.exits).toEqual({ south: 'forest', east: 'river' });
    expect(clearing.items).toEqual(['healing_herb']);
    expect(clearing.requiresLight).toBe(false);
  });

  it('should have correct mountain path', () => {
    const mountain = rooms.mountain;
    expect(mountain.id).toBe('mountain');
    expect(mountain.name).toBe('Mountain Path');
    expect(mountain.exits).toEqual({ north: 'river', east: 'peak' });
    expect(mountain.items).toEqual(['rope']);
    expect(mountain.monster).toEqual({ name: 'Mountain Goat', health: 8, attack: 2 });
    expect(mountain.requiresLight).toBe(false);
  });
});