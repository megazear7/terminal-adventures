import { Room } from './types.js';

export const rooms: Record<string, Room> = {
  cave: {
    id: 'cave',
    name: 'Dark Cave',
    description: 'You are in a damp cave. Water drips from the ceiling.',
    exits: { north: 'forest', east: 'tunnel', south: 'cavern' },
    items: ['torch'],
    requiresLight: false,
  },
  forest: {
    id: 'forest',
    name: 'Mysterious Forest',
    description: 'Tall trees surround you. Sunlight filters through the leaves.',
    exits: { south: 'cave' },
    items: [],
    requiresLight: false,
  },
  tunnel: {
    id: 'tunnel',
    name: 'Narrow Tunnel',
    description: 'A tight tunnel leads deeper into the mountain.',
    exits: { west: 'cave', east: 'treasure' },
    items: [],
    monster: { name: 'Goblin', health: 5, attack: 2 },
    requiresLight: false,
  },
  treasure: {
    id: 'treasure',
    name: 'Treasure Room',
    description: 'Golden light fills the room. You found the legendary treasure!',
    exits: { west: 'tunnel' },
    items: ['gold'],
    requiresLight: false,
  },
  cavern: {
    id: 'cavern',
    name: 'Dark Cavern',
    description: 'This cavern is pitch black. You can barely see anything without light.',
    exits: { north: 'cave', east: 'hidden' },
    items: [],
    requiresLight: true,
  },
  hidden: {
    id: 'hidden',
    name: 'Hidden Chamber',
    description: 'A secret chamber hidden in the darkness. Ancient runes glow faintly.',
    exits: { west: 'cavern' },
    items: ['ancient_key'],
    requiresLight: true,
  },
};