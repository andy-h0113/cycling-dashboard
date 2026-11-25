# Frontend context

Reference for the Angular app in `web/`. Linked from [AGENTS.md](../AGENTS.md).
Update this file in the same change whenever routes, directories, environments or commands change.

## Directory ownership

All paths are relative to `web/src/app/`.

| Directory | Contains | Notes |
| --- | --- | --- |
| `layout/` | App chrome: `shell/` (header, nav, `<router-outlet>`) | No feature logic |
| `core/config/` | `AppConfig` type and `APP_CONFIG` token | Public config only |
| `core/api/` | HTTP client setup and interceptors | Create with the API client |
| `features/<name>/` | Routed pages and feature-specific code | One folder per feature |
| `shared/` | Reusable presentational UI | Create on first real use |
| `mocks/` | Mock data and handlers | Create on first real use |

Root files: `app.ts` (renders the shell), `app.config.ts` (providers), `app.routes.ts` (routing table).

## Routes

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `features/home/Home` | Landing page |
| `/dashboard` | `features/dashboard/Dashboard` | Placeholder dashboard |
| `**` | `features/not-found/NotFound` | Fallback for unknown URLs |

All routes are lazy-loaded and set a page `title`. The app has no authentication; every route
is public.

## Environment settings

Build-time configuration via Angular `fileReplacements`:

| Environment | File | Selected by | `apiBaseUrl` |
| --- | --- | --- | --- |
| local | `src/environments/environment.development.ts` | `npm start`, `ng build -c development` | `http://localhost:3000/api` |
| production | `src/environments/environment.ts` | `npm run build` (default) | `/api` (same origin) |

Settings (`AppConfig`):

- `name`: environment label.
- `apiBaseUrl`: backend base URL, no trailing slash.

**Browser config is public.** Everything in these files ships in the JS bundle. Never add
secrets, API keys or client secrets.

To add an environment (e.g. a hosted dev API): create `environment.<name>.ts`, add a matching
`configurations.<name>` with `fileReplacements` under `build` (and `serve`) in `angular.json`, then
build with `ng build -c <name>`.

## Startup

`main.ts` → `bootstrapApplication(App, appConfig)` → `appConfig` provides the router, global
error listeners and `APP_CONFIG` (from the selected environment file) → `App` renders `Shell`,
which hosts the `<router-outlet>`.

## Verification commands

From `web/` (Node version from the root `.nvmrc`):

```sh
npm ci
npm start              # http://localhost:4200
npm run check          # format:check + lint + test:ci + build
npm run format:check
npm run lint
npm run test:ci
npm run build          # output: web/dist/web
```

Routing behaviour is covered by `src/app/app.routes.spec.ts` (each route, the fallback and
page titles).
