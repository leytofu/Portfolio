# React + TypeScript + Vite

## Environment variables

Copy `.env.example` to `.env` if you do not already have a local file:

```powershell
Copy-Item .env.example .env
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `DEV_PORT` | `5173` | Port for `npm run dev` |
| `PREVIEW_PORT` | `4173` | Port for `npm run preview` |
| `VITE_BASE_PATH` | `/` | Deployment pathname, e.g. `/portfolio/` |

All settings are optional. Ports must be integers from 1 to 65535. Vite may use the next available port if the requested port is occupied.

Set `VITE_BASE_PATH=/portfolio/` to host under a subdirectory, or keep `/` for root hosting. Use an absolute pathname, not a full URL or relative path. The router and asset URLs follow this setting; a missing trailing slash is added automatically. The host must serve the build at that path and rewrite client routes (e.g. `/portfolio/about`) to the deployed `index.html`.

Restart the server after changing environment variables. Vite also loads `.env.local`, `.env.development`, and `.env.production` (and their `.local` variants) for the corresponding mode. Local environment files are ignored by Git; `.env.example` is the tracked template.

For future browser configuration, use `VITE_` names and read them through `import.meta.env.VITE_YOUR_VARIABLE`. These values are public and embedded at build time: never put private keys or passwords in them. Rebuild the deployed site after changing browser variables. See the [Vite environment documentation](https://vite.dev/guide/env-and-mode).

Profile and project content remains in `src/data/portfolio.json`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
