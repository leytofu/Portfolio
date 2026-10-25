# Portfolio — Root Agent Instructions

Instructions for OpenCode, Codex, and any other coding agent working in this repository. This file is the workflow authority; shared project knowledge lives in Obsidian.

**Vault sync rule: whenever files in this repository change (source, configuration, dependencies, data, or documentation), update the affected notes in the Obsidian vault as part of the same task if their documented content is impacted.** Never rewrite unchanged notes. See Section 5 for the full procedure.

## 1. Project Configuration

### Repository

`C:\Users\leych\Wala_Lang\MyProjects\Portfolio`

### Obsidian Knowledge Base

Vault root:

`C:\Users\leych\AI-Workspace\Second-Brain`

Project documentation:

`C:\Users\leych\AI-Workspace\Second-Brain\01-Projects\Portfolio`

These directories are authorized destinations for project documentation and graph exports, subject to filesystem permissions and agent sandbox restrictions.

### Project Structure

- `src/pages/` — routed pages (Home, Projects, ProjectDetail, About, Skills, Contact, NotFound)
- `src/components/` — UI components; `SiteLayout`, `CinematicIntro`, `PageTransition`, `ThemeToggle` are core
- `src/data/portfolio.json` — single source of content (typed by `src/types.ts`)
- `src/hooks/` — `useTheme`, `useDocumentTitle`
- `src/index.css` — single global stylesheet (~3,100 lines)
- `public/` — static assets; `ref/` — design references; `dist/` — build output (gitignored)
- Other files — inspect before assuming their purpose. Some are vestigial (see `05-Known-Issues.md`).

Do not assume frameworks, services, or implementation details without verification. Source code is the authority.

## 2. Note Routing

Read only the relevant note(s) for the affected area. Never load the whole set by default.

| Area | Obsidian Note |
|---|---|
| Project overview | `00-Overview.md` |
| Architecture, routing, components | `01-Architecture.md` |
| Dependencies, scripts, tooling | `02-Tech-Stack.md` |
| Implemented features | `03-Features.md` |
| Progress and change history | `04-Development-Log.md` |
| Verified issues and dead code | `05-Known-Issues.md` |

For small, isolated fixes, read at most the relevant note or notes. Do not load all documentation automatically.

## 3. Before Implementation

1. Identify the affected area of this single-app repository.
2. Read only the relevant Obsidian note(s) when accessible and useful.
3. Verify important documentation details against current source code — docs may be stale.
4. Use targeted searches (`grep` on `src/`) instead of repository-wide scans; exclude `node_modules/`, `dist/`, and `ref/`.
5. Check `05-Known-Issues.md` before rediscovering a known issue.

## 4. Development Rules

- Preserve existing architecture, conventions, and all current functionality.
- Avoid unrelated refactoring and unnecessary dependencies.
- Use the `@/` import alias; add new content to `src/data/portfolio.json` rather than hardcoding when it is profile/project data.
- Keep secrets out: never write credentials, API keys, tokens, or `.env` values into this repo's docs or Obsidian. This project currently needs none.
- Do not overwrite unrelated changes made by the user or other agents.
- Verify after changes: `npm run lint` (fast) and `npm run build` (typecheck + bundle). No test suite exists — say so rather than implying tests passed.

## 5. Automatic Obsidian Synchronization

Documentation sync is part of task completion whenever documented project knowledge changes.

### Before coding

1. Read only the note(s) relevant to the task.
2. Check for outdated or conflicting information and verify against source.

### After meaningful code changes

1. Identify the actual implementation changes.
2. Update **only** the affected notes — never rewrite unchanged notes.
3. Append to `04-Development-Log.md` when progress meaningfully changes.
4. Update `05-Known-Issues.md` when issues are discovered, resolved, or altered.
5. Update `01-Architecture.md`, `02-Tech-Stack.md`, or `03-Features.md` only when their content is affected.
6. Preserve existing formatting, frontmatter, and `[[wikilinks]]`; keep one source of truth per topic; avoid duplicate notes and duplicate Markdown files inside the repository.

### Documentation exceptions

Skip documentation updates for changes that do not affect documented behavior, architecture, tooling, progress, or issues (e.g., trivial formatting or nonfunctional edits).

### Documentation integrity

- Document verified functionality only; never describe planned features as completed.
- If the vault is inaccessible, report the failure instead of claiming sync succeeded.

## 6. Cross-Agent Knowledge Sharing (OpenCode, Codex, others)

- All agents use the same Obsidian directory listed in Section 1.
- Read relevant notes before implementation; update existing notes instead of creating duplicates.
- Re-read a note immediately before modifying it; do not overwrite another agent's recent changes.
- Standard Markdown + Obsidian wikilinks only; keep agent-specific instructions in this file, separate from shared project knowledge.
- If documentation conflicts with source: inspect the implementation, correct the doc after verification, preserve useful history, and report unresolved ambiguity rather than inventing an explanation.
- Share project knowledge through Obsidian, not separate agent-specific documentation copies.

## 8. Safety

- Never expose or document secrets; respect `.gitignore`.
- Do not commit Obsidian vault content into this repository.
- Do not delete existing project notes or unrelated files without justification.
- Do not modify application source during documentation-only tasks.
- Request approval before touching directories outside this repository and the project's Obsidian folder.
- Do not overwrite existing Obsidian files through graph exports without verifying the destination.

## 9. Task Completion Checklist

1. Verify the requested implementation.
2. Run `npm run lint` and, when relevant, `npm run build`; report checks that could not be run.
3. Update only the affected Obsidian notes.
5. Confirm no unrelated files were unintentionally modified.
6. Report documentation or sync failures honestly.

## 10. Final Response Format

- **Implementation:** what changed.
- **Verification:** checks run and their results.
- **Documentation:** which Obsidian notes were updated, or why none were needed.
- **Outstanding Issues:** unresolved problems.

## 11. Operating Principle

**Retrieve relevant Obsidian knowledge → verify source code → implement → verify → update affected documentation → report accurately.**

These instructions apply to the entire repository. Prioritize accuracy, functionality, security, and efficient context usage.