import { Room } from './types.js';

export const rooms: Record<string, Room> = {
  cave: {
    id: 'cave',
    name: 'Dark Cave',
    description: 'You are in a damp cave. Water drips from the ceiling.',
    exits: { north: 'forest', east: 'tunnel' },
    items: ['torch'],
  },
  forest: {
    id: 'forest',
    name: 'Mysterious Forest',
    description: 'Tall trees surround you. Sunlight filters through the leaves.',
    exits: { south: 'cave' },
    items: [],
  },
  tunnel: {
    id: 'tunnel',
    name: 'Narrow Tunnel',
    description: 'A tight tunnel leads deeper into the mountain.',
    exits: { west: 'cave', east: 'treasure' },
    items: [],
    monster: { name: 'Goblin', health: 5, attack: 2 },
  },
  treasure: {
    id: 'treasure',
    name: 'Treasure Room',
    description: 'Golden light fills the room. You found the legendary treasure!',
    exits: { west: 'tunnel' },
    items: ['gold'],
  },
};