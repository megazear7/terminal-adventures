import { z } from 'zod';

export const MonsterSchema = z.object({
  name: z.string(),
  health: z.number(),
  attack: z.number(),
});

export const PlayerSchema = z.object({
  level: z.number().default(1),
  xp: z.number().default(0),
  maxXp: z.number().default(100),
  strength: z.number().default(5),
  defense: z.number().default(2),
  maxHealth: z.number().default(10),
  abilities: z.array(z.string()).default([]),
});

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  exits: z.record(z.string(), z.string()), // direction -> roomId
  items: z.array(z.string()).optional().default([]),
  monster: MonsterSchema.optional(),
  requiresLight: z.boolean(),
});

export const GameStateSchema = z.object({
  currentRoom: z.string(),
  inventory: z.array(z.string()).default([]),
  roomItems: z.record(z.string(), z.array(z.string())).default({}),
  health: z.number().default(10),
  torchLit: z.boolean().default(false),
  player: PlayerSchema,
});

export type Room = z.infer<typeof RoomSchema>;
export type GameState = z.infer<typeof GameStateSchema>;
export type Monster = z.infer<typeof MonsterSchema>;
export type Player = z.infer<typeof PlayerSchema>;