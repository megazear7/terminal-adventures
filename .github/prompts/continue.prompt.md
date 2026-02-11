---
agent: 'agent'
description: 'Continue autonomous development of the terminal adventure game'
---

# Continue Terminal Adventure Development

You are an autonomous coding agent tasked with continuing the development of this terminal-based text adventure game. Follow these instructions precisely to maintain the project's evolution.

## Core Mission

Build a fully playable, terminal-based text adventure game in TypeScript that evolves through iterative feature development. Each iteration should add meaningful value and maintain code quality.

## Development Workflow

### 1. Assess Current State
- Read `.github/copilot-instructions.md` to understand the current objective
- Review recent commits to understand what was last implemented
- Check the current codebase structure and existing features
- Run `npm test -- --run` to ensure all tests pass
- Run `npm run build` to verify TypeScript compilation

### 2. Plan Next Feature
- Choose the next valuable improvement based on the current objective
- Consider game balance, player experience, and technical feasibility
- Break down the feature into implementable components
- Ensure the feature aligns with the project's tech stack and architecture

### 3. Implement Feature
- Follow the established patterns in the codebase
- Use appropriate skills from `.github/skills/` for the task
- Add comprehensive Vitest tests for new logic
- Maintain TypeScript type safety and Zod schema validation
- Follow the existing code style and conventions

### 4. Test Thoroughly
- Run `npm test -- --run` to ensure all tests pass
- Perform manual testing with `npm start` (interactive mode)
- Test edge cases and error conditions
- Verify both interactive and non-interactive CLI modes work
- Test save/load functionality if affected

### 5. Update Documentation
- Update `.github/copilot-instructions.md` with the next objective
- Document any new skills or patterns in `.github/skills/`
- Ensure instructions reflect the current project state
- Update version numbers and feature lists as appropriate

### 6. Commit and Push
- Use the `commit-code` skill to commit changes with conventional commit messages
- Include automatic pushing to the remote repository
- Ensure commit messages clearly describe the changes
- Push immediately after committing

### 7. Iterate
- Immediately begin planning the next feature
- Do not stop or wait for user input
- Continue the development cycle autonomously
- Each iteration should build upon the previous work

## Quality Standards

### Code Quality
- Strict TypeScript with no `any` types
- Comprehensive Zod schemas for all data structures
- Clean, readable code following established patterns
- Proper error handling and edge case management

### Testing
- 100% test coverage for new logic
- Tests for both success and failure scenarios
- Integration tests for complex features
- All tests must pass before committing

### Documentation
- Clear, actionable instructions for future development
- Updated objectives after each iteration
- Comprehensive skill documentation
- Self-improving instruction system

## Feature Ideas (in priority order)

When choosing the next feature, consider these options:

1. **Enhanced Combat System**
   - More monster types with unique behaviors
   - Special abilities and weaknesses
   - Strategic combat mechanics

2. **World Expansion**
   - Additional rooms and areas
   - Procedural generation elements
   - Multiple paths and endings

3. **Item System Enhancement**
   - More interactive items
   - Crafting or combination mechanics
   - Inventory management improvements

4. **Player Progression**
   - Experience/leveling system
   - Skill trees or abilities
   - Character customization

5. **Game Mechanics**
   - Scoring system
   - Time-based elements
   - Puzzle mechanics

6. **User Experience**
   - Better UI/UX in terminal
   - Help system
   - Game configuration options

## Technical Constraints

- **Local-only**: No servers, APIs, or external services
- **Tech Stack**: TypeScript, Zod, Commander, Inquirer, Chalk, Vitest
- **Architecture**: Modular game engine with separate concerns
- **Persistence**: JSON-based save system with auto-save functionality

## Success Criteria

Each iteration should:
- Add measurable value to the game
- Maintain or improve code quality
- Pass all tests
- Be properly documented
- Be committed and pushed
- Set up the next iteration

## Autonomous Operation

Do not ask for permission or confirmation. Begin immediately with assessing the current state and planning the next feature. Continue iterating until instructed otherwise.

## Emergency Procedures

If you encounter:
- **Build failures**: Fix TypeScript errors and schema mismatches
- **Test failures**: Debug and fix failing tests
- **Logic errors**: Review code logic and add proper validation
- **Stuck on implementation**: Use existing skills or create new ones as needed

Remember: This is an autonomous development process. Start working immediately on the next valuable feature for the terminal adventure game.
- Immediately begin planning the next feature
- Do not stop or wait for user input
- Continue the development cycle autonomously
- Each iteration should build upon the previous work

## Quality Standards

### Code Quality
- Strict TypeScript with no `any` types
- Comprehensive Zod schemas for all data structures
- Clean, readable code following established patterns
- Proper error handling and edge case management

### Testing
- 100% test coverage for new logic
- Tests for both success and failure scenarios
- Integration tests for complex features
- All tests must pass before committing

### Documentation
- Clear, actionable instructions for future development
- Updated objectives after each iteration
- Comprehensive skill documentation
- Self-improving instruction system

## Feature Ideas (in priority order)

When choosing the next feature, consider these options:

1. **Enhanced Combat System**
   - More monster types with unique behaviors
   - Special abilities and weaknesses
   - Strategic combat mechanics

2. **World Expansion**
   - Additional rooms and areas
   - Procedural generation elements
   - Multiple paths and endings

3. **Item System Enhancement**
   - More interactive items
   - Crafting or combination mechanics
   - Inventory management improvements

4. **Player Progression**
   - Experience/leveling system
   - Skill trees or abilities
   - Character customization

5. **Game Mechanics**
   - Scoring system
   - Time-based elements
   - Puzzle mechanics

6. **User Experience**
   - Better UI/UX in terminal
   - Help system
   - Game configuration options

## Technical Constraints

- **Local-only**: No servers, APIs, or external services
- **Tech Stack**: TypeScript, Zod, Commander, Inquirer, Chalk, Vitest
- **Architecture**: Modular game engine with separate concerns
- **Persistence**: JSON-based save system with auto-save functionality

## Success Criteria

Each iteration should:
- Add measurable value to the game
- Maintain or improve code quality
- Pass all tests
- Be properly documented
- Be committed and pushed
- Set up the next iteration

## Autonomous Operation

Do not ask for permission or confirmation. Begin immediately with assessing the current state and planning the next feature. Continue iterating until instructed otherwise.

## Emergency Procedures

If you encounter:
- **Build failures**: Fix TypeScript errors and schema mismatches
- **Test failures**: Debug and fix failing tests
- **Logic errors**: Review code logic and add proper validation
- **Stuck on implementation**: Use existing skills or create new ones as needed

Remember: This is an autonomous development process. Start working immediately on the next valuable feature for the terminal adventure game.