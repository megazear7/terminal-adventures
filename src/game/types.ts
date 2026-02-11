import { z } from 'zod';

export const MonsterSchema = z.object({
  name: z.string(),
  health: z.number(),
  attack: z.number(),
});

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  exits: z.record(z.string(), z.string()), // direction -> roomId
  items: z.array(z.string()).optional().default([]),
  monster: MonsterSchema.optional(),
});

export const GameStateSchema = z.object({
  currentRoom: z.string(),
  inventory: z.array(z.string()).default([]),
  roomItems: z.record(z.string(), z.array(z.string())).default({}),
  health: z.number().default(10),
});

export type Room = z.infer<typeof RoomSchema>;
export type GameState = z.infer<typeof GameStateSchema>;
export type Monster = z.infer<typeof MonsterSchema>;