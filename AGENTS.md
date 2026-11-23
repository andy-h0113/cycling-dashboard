# AGENTS.md

Instructions for coding agents (and humans) working in this repository.

## Repository layout and boundaries

| Path | Owner / purpose | Agent may edit? |
| --- | --- | --- |
| `web/` | Angular frontend (standalone, strict TS) | Yes |
| `api/` | Node + TypeScript backend (not created yet) | Only when the ticket is a backend ticket |
| `docs/` | Project context docs | Yes; keep in sync with code changes |
| `.github/workflows/` | CI | Only when the ticket asks for CI changes |
| `data/` | Personal health data (git-ignored) | **Never read, copy, or commit** |
| `tickets/` | Local ticket exports (git-ignored) | Read-only |

Frontend details (directory ownership, routes, environments, startup):
**[docs/frontend-context.md](docs/frontend-context.md)**. Read it before changing `web/`.

## Contracts

- **Backend API**: OpenAPI contract, to be added with the mock backend ticket (planned at
  `api/openapi.yaml`). Frontend API code must follow the contract rather than guess shapes.
- **Browser config**: `web/src/app/core/config/app-config.ts` (`AppConfig`). Public values only.

## Toolchain

- Node version is pinned in [`.nvmrc`](.nvmrc) (`fnm use` / `nvm use` from the repo root).
- npm, with the committed `web/package-lock.json`. Use `npm ci`, not `npm install`, unless you
  are intentionally changing dependencies.

## Check commands

Run from `web/`. All must pass before opening a PR; CI runs the same set
([.github/workflows/ci.yml](.github/workflows/ci.yml)).

```sh
npm ci
npm run format:check   # prettier
npm run lint           # angular-eslint
npm run test:ci        # vitest, single run
npm run build          # production build
```

### CI structure

[`ci.yml`](.github/workflows/ci.yml) runs on every PR and on pushes to `main`. A `changes` job
detects which areas changed, each area's job (currently `web`) runs only when its files changed,
and the `ci-ok` gate job always runs. `ci-ok` is the **only required status check** on `main`, so
the branch ruleset never needs editing when areas are added.

To add an area (e.g. `api/` with the backend ticket): add a filter and output to `changes`, add a
job with that area's own check commands, and add the job to `ci-ok`'s `needs`.

## Conventions

- Standalone components, `ChangeDetectionStrategy.OnPush`, signals for local state.
- File naming follows Angular CLI v20+ style: `dashboard.ts` exports `Dashboard` (no `.component` suffix).
- Feature routes are lazy (`loadComponent`) and registered in `web/src/app/app.routes.ts`.
- Protected routes use `canMatch: [authGuard]`.
- Inject `APP_CONFIG`; never import `environments/*` outside `app.config.ts`.
- Add a test for every new route or guard behaviour in `app.routes.spec.ts`.

## Workflow

1. One ticket per branch: `BPD-<n>-short-description`. For parallel or agent work, use an
   isolated worktree: `git worktree add ../cd-BPD-<n> -b BPD-<n>-short-description`.
2. Keep the change small and scoped to the ticket. Update `docs/frontend-context.md` if you
   change routes, directories, environment settings or commands.
3. Run the check commands above.
4. Open a PR against `main` that references the ticket. A human reviews and merges; agents do
   not merge their own PRs.
