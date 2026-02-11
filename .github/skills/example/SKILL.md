# Terminal Adventure Game Development Skills

This document contains specialized skills for developing and maintaining the terminal-based text adventure game. Each skill provides detailed instructions for specific development tasks.

## commit-code

**When to use:** Use this skill whenever you need to commit code changes to the repository. This skill ensures proper version control practices and automatic pushing of changes.

**Instructions:**
1. **Stage changes:** Run `git add .` to stage all modified files
2. **Check status:** Run `git status` to verify what will be committed
3. **Commit with conventional message:** Use `git commit -m "type: description"` following conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `test:` for test-related changes
   - `refactor:` for code restructuring
   - `chore:` for maintenance tasks
4. **Push changes:** Always run `git push` after committing to sync with remote repository
5. **Verify:** Run `git log --oneline -5` to confirm the commit was created

**Example:**
```bash
git add .
git commit -m "feat: add dragon monster with special abilities"
git push
```

**Best practices:**
- Commit frequently with clear, descriptive messages
- Never commit broken code - run tests first
- Use present tense in commit messages
- Keep commits focused on single changes
- Always push after committing

## add-room

**When to use:** Use this skill when adding new rooms to the game world, including navigation connections and special features.

**Instructions:**
1. **Update rooms.ts:** Add the new room object to the `rooms` Record with:
   - `id`: unique string identifier
   - `name`: display name
   - `description`: room description
   - `exits`: object mapping directions to room IDs
   - `items`: array of items in the room (optional)
   - `monster`: monster object if present (optional)
   - `requiresLight`: boolean for light-dependent visibility

2. **Update navigation:** Ensure exits connect properly to existing rooms
3. **Add tests:** Update room tests in `__tests__/rooms.test.ts` to include the new room
4. **Test navigation:** Verify players can navigate to/from the new room

**Example:**
```typescript
cavern: {
  id: 'cavern',
  name: 'Dark Cavern',
  description: 'This cavern is pitch black. You can barely see anything without light.',
  exits: { north: 'cave', east: 'hidden' },
  items: [],
  requiresLight: true,
}
```

**Best practices:**
- Keep room descriptions immersive and atmospheric
- Ensure all exits have corresponding return paths
- Use consistent naming conventions
- Test navigation in both directions
- Consider lighting requirements for atmosphere

## add-monster

**When to use:** Use this skill when adding new monster types with unique behaviors, stats, and combat mechanics.

**Instructions:**
1. **Define monster schema:** Ensure the monster follows the MonsterSchema with name, health, and attack
2. **Add to room:** Place the monster in a room's `monster` property
3. **Implement special behavior:** If the monster has unique mechanics (e.g., ghost requiring special items), update combat logic in `engine.ts`
4. **Balance difficulty:** Adjust health/attack values based on game progression
5. **Add descriptive messages:** Update combat messages to be monster-specific
6. **Test combat:** Verify the monster behaves correctly in battle

**Example:**
```typescript
dragon: {
  name: 'Ancient Dragon',
  health: 25,
  attack: 4,
},
```

**Best practices:**
- Balance health/attack with game difficulty curve
- Add unique flavor text for each monster
- Consider special abilities or weaknesses
- Test combat thoroughly with different strategies
- Ensure monster names are memorable and thematic

## add-item

**When to use:** Use this skill when adding new items that players can collect, use, or interact with.

**Instructions:**
1. **Place in room:** Add the item to a room's `items` array
2. **Implement usage logic:** If the item is usable, add handling in the `use` command logic in `engine.ts`
3. **Update state if needed:** If the item affects game state (like torch lighting), update GameState schema
4. **Add item-specific logic:** Implement any special behaviors or effects
5. **Test collection and usage:** Verify players can take and use the item correctly

**Example:**
```typescript
// In rooms.ts
items: ['torch', 'ancient_key']

// In engine.ts use logic
if (item === 'torch') {
  updateState({ torchLit: !state.torchLit });
  console.log(chalk.yellow(state.torchLit ? 'You light the torch!' : 'You extinguish the torch.'));
}
```

**Best practices:**
- Make items useful and interesting
- Provide clear feedback when using items
- Consider item combinations or puzzles
- Test both taking and using items
- Use descriptive item names

## update-schema

**When to use:** Use this skill when modifying Zod schemas for game data structures (Room, GameState, Monster).

**Instructions:**
1. **Identify schema:** Determine which schema needs updating (RoomSchema, GameStateSchema, MonsterSchema)
2. **Add/modify fields:** Update the Zod schema with new properties
3. **Update types:** Ensure TypeScript types are inferred correctly
4. **Update existing data:** Modify all existing room/monster definitions to match the new schema
5. **Update tests:** Modify tests to reflect schema changes
6. **Rebuild and test:** Run `npm run build` and `npm test` to ensure everything works

**Example:**
```typescript
// Adding torchLit to GameState
export const GameStateSchema = z.object({
  currentRoom: z.string(),
  inventory: z.array(z.string()).default([]),
  roomItems: z.record(z.string(), z.array(z.string())).default({}),
  health: z.number().default(10),
  torchLit: z.boolean().default(false), // New field
});
```

**Best practices:**
- Use appropriate Zod validators (string, number, boolean, etc.)
- Provide sensible defaults where possible
- Update all affected code when changing schemas
- Test thoroughly after schema changes
- Document the purpose of new fields

## add-test

**When to use:** Use this skill when adding new test cases to ensure code quality and prevent regressions.

**Instructions:**
1. **Identify test file:** Choose the appropriate test file (`rooms.test.ts`, `state.test.ts`, etc.)
2. **Write test case:** Create a descriptive `it()` block with clear expectations
3. **Test functionality:** Cover the specific feature or behavior being tested
4. **Run tests:** Execute `npm test -- --run` to verify the test passes
5. **Check coverage:** Ensure the test covers edge cases and error conditions

**Example:**
```typescript
it('should handle torch lighting correctly', () => {
  const state = { torchLit: false, inventory: ['torch'] };
  const result = processCommand('use torch', state);
  expect(result.state.torchLit).toBe(true);
  expect(result.messages).toContain('You light the torch!');
});
```

**Best practices:**
- Write descriptive test names
- Test both success and failure cases
- Keep tests focused and independent
- Use meaningful assertions
- Run tests frequently during development

## update-instructions

**When to use:** Use this skill when updating Copilot instructions, skills, or project documentation after completing a development iteration.

**Instructions:**
1. **Update objective:** Modify the current objective in `.github/copilot-instructions.md` to reflect the next goal
2. **Document changes:** Add any new skills or update existing ones as needed
3. **Update project status:** Reflect current features and architecture in the instructions
4. **Commit changes:** Use the commit-code skill to save the documentation updates
5. **Verify clarity:** Ensure instructions are clear and actionable for future sessions

**Example:**
After completing v0.7 monster additions, update the objective to v0.8 with the next feature.

**Best practices:**
- Keep instructions current and relevant
- Document architectural decisions
- Include examples and best practices
- Update after each major feature completion
- Ensure instructions help future development