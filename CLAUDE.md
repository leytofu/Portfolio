# Claude Code Project Instructions

@AGENTS.md

The imported root `AGENTS.md` is the shared workflow authority for this repository. This file adds only Claude-specific pointers.

## Obsidian Knowledge Base

`C:\Users\leych\AI-Workspace\Second-Brain\01-Projects\Portfolio`

Read only the notes relevant to the task: `00-Overview.md`, `01-Architecture.md`, `02-Tech-Stack.md`, `03-Features.md`, `04-Development-Log.md`, `05-Known-Issues.md`.

## Graphify

Repository index: `graphify-out/`. Use the installed `graphify` skill or CLI only for dependency questions, and verify findings in `src/`.

## Development Workflow

1. Read the relevant project notes.
2. Inspect the actual source code.
3. Implement focused changes.
4. Run `npm run lint`, and `npm run build` when relevant.
5. Update only the affected Obsidian notes.
6. Refresh Graphify only if component relationships changed.
7. Report verification and any synchronization failure. There is no test suite.

## Token Efficiency

Do not read the whole vault, `node_modules/`, `dist/`, `ref/`, or the full graph.
