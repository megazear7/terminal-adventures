## Feature Addition Workflow

1. Read current objective.md + all .github/instructions/ files.
2. Identify the smallest valuable next step.
3. Check .github/skills/ for any matching skill and follow it if found.
4. Update Zod types first if needed.
5. Implement in the appropriate src/ file.
6. Add/update Vitest tests.
7. Run `npm test` and manually test with `npm start`.
8. Commit with clear conventional message.
9. Update objective.md with the new next goal.