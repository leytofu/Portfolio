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

The Vite settings above are optional. Ports must be integers from 1 to 65535. Vite may use the next available port if the requested port is occupied.

Set `VITE_BASE_PATH=/portfolio/` to host under a subdirectory, or keep `/` for root hosting. Use an absolute pathname, not a full URL or relative path. The router and asset URLs follow this setting; a missing trailing slash is added automatically. The host must serve the build at that path and rewrite client routes (e.g. `/portfolio/about`) to the deployed `index.html`.

Restart the server after changing environment variables. Vite also loads `.env.local`, `.env.development`, and `.env.production` (and their `.local` variants) for the corresponding mode. Local environment files are ignored by Git; `.env.example` is the tracked template.

For future browser configuration, use `VITE_` names and read them through `import.meta.env.VITE_YOUR_VARIABLE`. These values are public and embedded at build time: never put private keys or passwords in them. Rebuild the deployed site after changing browser variables. See the [Vite environment documentation](https://vite.dev/guide/env-and-mode).

Profile and project content remains in `src/data/portfolio.json`.

## Contact API on Vercel

The Contact page sends JSON to `POST /api/contact`. The server implementation in `src/api/contact.ts` validates the message and sends a plain-text email through [Resend](https://resend.com/docs/api-reference/emails/send-email). `vercel.json` explicitly builds `src/api/contact.ts` with `@vercel/node` and routes `/api/contact` to it; there is no root `api/` folder. `src/api` is checked by the server TypeScript configuration and excluded from the frontend configuration; do not import it into browser code. Replies go to the visitor's email; the recipient is controlled on the server. No email SDK or database is needed.

1. Create a Resend account and a sending API key.
2. In Vercel **Project Settings → Environment Variables**, add:
   - `RESEND_API_KEY`: your Resend API key (server only; never prefix with `VITE_`).
   - `CONTACT_TO_EMAIL`: the inbox where you want to receive messages, normally the email shown in `portfolio.json`.
   - `CONTACT_FROM_EMAIL`: optional; defaults to `Portfolio <onboarding@resend.dev>`.
3. With the default sender, `CONTACT_TO_EMAIL` must be the email registered with your Resend account. For another recipient, [verify a domain in Resend](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain) and set `CONTACT_FROM_EMAIL` to a sender on that domain, e.g. `Portfolio <contact@your-domain.com>`. Do not use a Gmail address as the sender.
4. Enable these variables for the deployment environments you use (Production and optionally Preview), then redeploy. Keep the root base path `/`. The explicit `builds` in `vercel.json` run the frontend through `@vercel/static-build` (the package build script, output `dist`) and the API through `@vercel/node`. This uses Vercel's legacy builders to support a handler outside the root `api/` directory; dashboard Build and Output settings do not control these explicit builds. Routes serve `/api/contact` first, then built static assets, then the SPA fallback. See [Vercel build configuration](https://vercel.com/docs/project-configuration/vercel-json#builds).
5. Submit the deployed Contact form and confirm the email arrives. Success means Resend accepted the message; final delivery still depends on the email provider. Check spam and Vercel function logs if needed.

For local full-stack use, set the server variables in a Git-ignored `.env.local` and run `npx vercel dev`. `npm run dev` and `npm run preview` serve the frontend only and do not run `/api/contact`. Never commit actual API keys. Run the API checks with `node --experimental-strip-types --test tests/contact.test.mjs` (Node 22.6+).

The API rejects cross-origin browser submissions, limits request/field sizes, and includes a hidden honeypot. These are basic spam defenses, not distributed rate limiting; Vercel Firewall rules can further restrict abusive traffic. Messages are processed by Resend and delivered to the configured inbox; this app does not persist them in a database.

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
