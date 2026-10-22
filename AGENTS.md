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

Graphify exports:

`C:\Users\leych\AI-Workspace\Second-Brain\01-Projects\Portfolio\Graphify`

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
| Code dependencies and relationships | `Graphify/` generated graph |

For small, isolated fixes, read at most the relevant note or notes. Do not load all documentation automatically.

Use Graphify for dependency investigations rather than reading unrelated source files.

## 3. Before Implementation

1. Identify the affected area of this single-app repository.
2. Read only the relevant Obsidian note(s) when accessible and useful.
3. Verify important documentation details against current source code — docs may be stale.
4. Use targeted searches (`grep` on `src/`) instead of repository-wide scans; exclude `node_modules/`, `dist/`, and `ref/`.
5. Check `05-Known-Issues.md` before rediscovering a known issue.
6. Consult Graphify only when dependency relationships genuinely need investigation.
7. Reuse an existing Graphify index when available; do not regenerate it for every task.

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
- Treat Graphify output as generated evidence, not as a replacement for verified source code.

## 7. Graphify + Obsidian Workflow

### Configuration

**Project repository:**

`C:/Users/leych/Wala_Lang/MyProjects/Portfolio`

**Obsidian knowledge base:**

`C:/Users/leych/AI-Workspace/Second-Brain/01-Projects/Portfolio`

**Graphify export directory:**

`C:/Users/leych/AI-Workspace/Second-Brain/01-Projects/Portfolio/Graphify`

### Purpose

Graphify provides a structured representation of code relationships, dependencies, and architecture.

Obsidian stores persistent project documentation, while OpenCode and Codex use relevant knowledge to support efficient development.

The goal is to reduce unnecessary repeated source exploration without sacrificing implementation accuracy.

### Before Development

1. Identify the affected feature, component, page, or configuration.
2. Read only the relevant Obsidian notes.
3. Check whether a Graphify index already exists.
4. Query the existing Graphify graph when dependency relationships or architectural connections need investigation.
5. Inspect only the necessary source files.
6. Verify Graphify findings against the current implementation.
7. Avoid loading the entire knowledge graph into the agent context.
8. Do not regenerate Graphify for simple tasks where targeted source inspection is sufficient.

### Graphify Usage

When supported by the installed Graphify integration, use these commands from the Portfolio repository:

**Initial graph generation:**

`/graphify . --obsidian --obsidian-dir "C:/Users/leych/AI-Workspace/Second-Brain/01-Projects/Portfolio/Graphify"`

**Incremental graph update:**

`/graphify . --update`

**Example graph queries:**

- How does navigation work in the Portfolio?
- Which components depend on SiteLayout?
- Which files are affected by changes to portfolio.json?
- How are routes and page transitions connected?
- Which components use ThemeToggle?

Use the installed Graphify integration's supported command syntax. Verify availability before execution. Do not assume slash commands are available in every agent or installation.

### After Meaningful Changes

1. Verify the implementation before updating generated graph data.
2. Determine whether code relationships or dependencies actually changed.
3. Update the Graphify index only when necessary.
4. Prefer incremental updates over full graph regeneration when supported.
5. Update only the affected Obsidian documentation.
6. Preserve existing notes, wikilinks, and frontmatter.
7. Avoid duplicate graph exports and duplicate Markdown files.
8. Do not replace manually maintained documentation with generated graph output.
9. Record meaningful architectural changes in `04-Development-Log.md`.
10. Report Graphify update failures without claiming the graph is synchronized.

### Token Optimization

- Prefer concise, targeted Graphify queries.
- Never load the complete graph when only a small dependency relationship is needed.
- Reuse existing graph data when current.
- Avoid unnecessary full-repository scans.
- Inspect actual source code before editing.
- Keep generated graph output separate from manually maintained documentation.
- Do not repeatedly read unchanged notes.
- Never assume Graphify eliminates the need to inspect code.

### Graph Integrity

- Source code remains the ultimate authority.
- Graphify data may become outdated after repository changes.
- Do not treat unverified graph relationships as confirmed facts.
- If the graph conflicts with source code, trust the verified implementation.
- Refresh outdated graph data only when relevant.
- Never overwrite unrelated notes during graph exports.
- Avoid storing credentials, tokens, or sensitive environment values in generated graph documentation.

### Multi-Agent Coordination

OpenCode and Codex should use the same project documentation and compatible Graphify data when supported.

Agents must:

1. Reuse existing knowledge rather than unnecessarily regenerating it.
2. Verify graph freshness before relying on dependency relationships.
3. Avoid simultaneous writes to the same generated graph files.
4. Preserve documentation changes made by other agents.
5. Update only the documentation and graph data affected by their tasks.

Graphify is a supporting tool, not a mandatory prerequisite for every development task.

## 8. Safety

- Never expose or document secrets; respect `.gitignore`.
- Do not commit Obsidian vault content into this repository.
- Do not delete existing project notes or unrelated files without justification.
- Do not modify application source during documentation-only tasks.
- Request approval before touching directories outside this repository and the project's Obsidian folder.
- Do not execute destructive Graphify operations without understanding their effects.
- Do not overwrite existing Obsidian files through graph exports without verifying the destination.

## 9. Task Completion Checklist

1. Verify the requested implementation.
2. Run `npm run lint` and, when relevant, `npm run build`; report checks that could not be run.
3. Update only the affected Obsidian notes.
4. Refresh Graphify only when relevant code relationships changed and the integration supports it.
5. Confirm no unrelated files were unintentionally modified.
6. Report documentation, Graphify, or sync failures honestly.

## 10. Final Response Format

- **Implementation:** what changed.
- **Verification:** checks run and their results.
- **Documentation:** which Obsidian notes were updated, or why none were needed.
- **Graphify:** whether the graph was reused, updated, skipped, or unavailable.
- **Outstanding Issues:** unresolved problems.

## 11. Operating Principle

**Retrieve relevant Obsidian knowledge → consult Graphify when useful → verify source code → implement → verify → update affected documentation and graph data → report accurately.**

These instructions apply to the entire repository. Prioritize accuracy, functionality, security, and efficient context usage.