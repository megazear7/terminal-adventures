import { describe, it, expect } from 'vitest';
import { rooms } from '../rooms.js';

describe('Rooms', () => {
  it('should have all required rooms', () => {
    expect(rooms.cave).toBeDefined();
    expect(rooms.forest).toBeDefined();
    expect(rooms.tunnel).toBeDefined();
    expect(rooms.treasure).toBeDefined();
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
  });
});