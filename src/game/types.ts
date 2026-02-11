import { z } from 'zod';

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  exits: z.record(z.string(), z.string()), // direction -> roomId
  items: z.array(z.string()).optional().default([]),
});

export const GameStateSchema = z.object({
  currentRoom: z.string(),
  inventory: z.array(z.string()).default([]),
  roomItems: z.record(z.string(), z.array(z.string())).default({}),
});

export type Room = z.infer<typeof RoomSchema>;
export type GameState = z.infer<typeof GameStateSchema>;