# Graph Report - Portfolio  (2026-10-22)

## Corpus Check
- 50 files · ~104,508 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .example 1, (none) 1, .css 1)

## Summary
- 290 nodes · 535 edges · 19 communities (14 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5621eec9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Shared UI Building Blocks
- App Shell and Navigation
- NPM Dependency Manifest
- App.tsx
- Tech Stack Icon Library
- TypeScript App Config
- TypeScript Tooling Config
- Portfolio Data Domain Types
- Agent Workflow Governance
- Site Identity and Visual Language
- Oxlint Rule Configuration
- ESLint Config (Vestigial)
- Next.js Config (Vestigial)
- Page Header Component
- TypeScript Project References
- devDependencies
- Claude Code Project Instructions
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `react` - 22 edges
2. `compilerOptions` - 20 edges
3. `TechIcon()` - 16 edges
4. `Shell()` - 15 edges
5. `useDocumentTitle()` - 15 edges
6. `compilerOptions` - 15 edges
7. `svg()` - 14 edges
8. `react-router-dom` - 13 edges
9. `Reveal()` - 11 edges
10. `monogram()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Site Identity Metadata — Charlie Nozares, Full Stack Developer` --conceptually_related_to--> `Reference Persona 'Staz Cid' — Full Stack Developer in Philippines`  [INFERRED]
  index.html → ref/VS Code Portfolio Dashboard.png
- `VS Code Framed Portfolio Dashboard Design Reference` --conceptually_related_to--> `Site Identity Metadata — Charlie Nozares, Full Stack Developer`  [INFERRED]
  ref/VS Code Portfolio Dashboard.png → index.html
- `Pre-Paint Theme Bootstrap Script (localStorage + prefers-color-scheme)` --conceptually_related_to--> `Dark Navy + Electric Blue Neon Aesthetic`  [INFERRED]
  index.html → ref/VS Code Portfolio Dashboard.png
- `VS Code Framed Portfolio Dashboard Design Reference` --conceptually_related_to--> `Pre-Paint Theme Bootstrap Script (localStorage + prefers-color-scheme)`  [INFERRED]
  ref/VS Code Portfolio Dashboard.png → index.html
- `PROFILE_PATH Constant in ProfilePortrait.tsx` --semantically_similar_to--> `Portrait Photo of Developer Reading at Library Desk with Laptop`  [INFERRED] [semantically similar]
  public/images/README.md → public/images/mypfp.jpg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Obsidian Documentation Governance Flow** — agents_note_routing, agents_obsidian_sync_rule, agents_documentation_integrity, agents_multi_agent_coordination [EXTRACTED 1.00]
- **Dark Developer-Focused Visual Language (theme script, VS Code framing, blue-accent assets)** — index_theme_bootstrap_script, index_typography_stack, public_favicon_brand_glyph, ref_vs_code_portfolio_dashboard_design_reference, ref_vs_code_portfolio_dashboard_vscode_frame_chrome, ref_vs_code_portfolio_dashboard_dark_blue_aesthetic [INFERRED 0.75]
- **Hero Portrait Asset Pipeline (docs, PROFILE_PATH, placeholder SVG, actual photo)** — public_images_readme_profile_portrait_setup, public_images_readme_profile_path_constant, public_images_readme_silhouette_fallback, public_images_profile_svg_placeholder, public_images_mypfp_portrait_photo [INFERRED 0.85]

## Communities (19 total, 5 thin omitted)

### Community 0 - "Shared UI Building Blocks"
Cohesion: 0.13
Nodes (27): react-router-dom, TechIcon(), useIntroActive(), PageIntro(), PageIntroProps, PROFILE_PATH, ProfilePortrait(), ProfilePortraitProps (+19 more)

### Community 1 - "App Shell and Navigation"
Cohesion: 0.12
Nodes (28): CommandPalette(), CommandPaletteProps, SearchItem, CssIcon(), HtmlIcon(), TailwindIcon(), VscodeIcon(), GitHubIcon() (+20 more)

### Community 2 - "NPM Dependency Manifest"
Cohesion: 0.05
Nodes (27): dependencies, motion, react, react-dom, react-router-dom, name, private, scripts (+19 more)

### Community 3 - "App.tsx"
Cohesion: 0.14
Nodes (17): motion, react, App(), Shell(), shouldPlayIntro(), CinematicIntro(), EASE_IN_OUT, EASE_OUT (+9 more)

### Community 4 - "Tech Stack Icon Library"
Cohesion: 0.18
Nodes (22): HeroLaptop(), FirebaseIcon(), FirebaseNameUnknownIcon(), GgufIcon(), GitIcon(), IconProps, JavascriptIcon(), LaravelIcon() (+14 more)

### Community 5 - "TypeScript App Config"
Cohesion: 0.09
Nodes (22): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+14 more)

### Community 6 - "TypeScript Tooling Config"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 7 - "Portfolio Data Domain Types"
Cohesion: 0.13
Nodes (13): ProjectCardProps, ContactMethod, Education, Experience, FooterLink, Hero, NavLink, PortfolioData (+5 more)

### Community 8 - "Agent Workflow Governance"
Cohesion: 0.23
Nodes (4): Documented Project Structure (src/pages, src/components, src/data/portfolio.json), Portfolio Root Agent Instructions, Oxlint Type-Aware Lint Configuration via oxlint-tsgolint, React + TypeScript + Vite Scaffold Template

### Community 9 - "Site Identity and Visual Language"
Cohesion: 0.24
Nodes (12): Site Identity Metadata — Charlie Nozares, Full Stack Developer, Pre-Paint Theme Bootstrap Script (localStorage + prefers-color-scheme), Typography Stack — Inter, Inter Tight, JetBrains Mono, Favicon Brand Glyph — Purple Interlocking Chevron Mark, Portrait Photo of Developer Reading at Library Desk with Laptop, Abstract Avatar Silhouette Placeholder (profile.svg, 'REPLACE ME'), PROFILE_PATH Constant in ProfilePortrait.tsx, Hero Profile Portrait Setup Instructions (+4 more)

### Community 10 - "Oxlint Rule Configuration"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 16 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, oxlint, @types/node, @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react

### Community 17 - "Claude Code Project Instructions"
Cohesion: 0.33
Nodes (5): Claude Code Project Instructions, Development Workflow, Graphify, Obsidian Knowledge Base, Token Efficiency

### Community 18 - "vercel.json"
Cohesion: 0.50
Nodes (3): builds, routes, $schema

## Knowledge Gaps
- **4 isolated node(s):** `@types/node`, `@types/react`, `@types/react-dom`, `oxlint`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 135 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `Shared UI Building Blocks`, `App Shell and Navigation`, `NPM Dependency Manifest`, `Tech Stack Icon Library`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **What connects `@types/node`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Shared UI Building Blocks` be split into smaller, more focused modules?**
  _Cohesion score 0.1292929292929293 - nodes in this community are weakly interconnected._
- **Why does `react-router-dom` connect `Shared UI Building Blocks` to `App Shell and Navigation`, `NPM Dependency Manifest`, `App.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `App Shell and Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Should `NPM Dependency Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.05384615384615385 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13538461538461538 - nodes in this community are weakly interconnected._