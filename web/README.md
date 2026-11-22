# Cycling Dashboard: web

Angular 22 frontend (standalone components, strict TypeScript, Vitest).

## Prerequisites

- Node version from the repo-root [`.nvmrc`](../.nvmrc). From the repo root: `fnm use` or `nvm use`.
- npm (version pinned via `packageManager` in `package.json`).

## Commands

Run from this directory:

| Task | Command |
| --- | --- |
| Install (clean, from lockfile) | `npm ci` |
| Start dev server (http://localhost:4200) | `npm start` |
| Lint | `npm run lint` |
| Check formatting | `npm run format:check` (fix with `npm run format`) |
| Unit tests (watch) | `npm test` |
| Unit tests (single run, CI) | `npm run test:ci` |
| Production build (`dist/web`) | `npm run build` |

## Environments

`npm start` uses the **local** config (`src/environments/environment.development.ts`);
`npm run build` uses **production** (`src/environments/environment.ts`).
See [docs/frontend-context.md](../docs/frontend-context.md#environment-settings) for the settings
and how to add more environments.

## More

- Project structure, routes and conventions: [docs/frontend-context.md](../docs/frontend-context.md)
- Repo boundaries and contribution workflow: [AGENTS.md](../AGENTS.md)
