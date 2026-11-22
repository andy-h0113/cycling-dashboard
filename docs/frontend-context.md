# Frontend context

Reference for the Angular app in `web/`. Linked from [AGENTS.md](../AGENTS.md).
Update this file in the same PR whenever routes, directories, environments or commands change.

## Directory ownership

All paths are relative to `web/src/app/`.

| Directory | Contains | Notes |
| --- | --- | --- |
| `layout/` | App chrome: `shell/` (header, nav, `<router-outlet>`) | No feature logic |
| `core/auth/` | `authGuard` and, later, session/auth services | Singleton plumbing |
| `core/config/` | `AppConfig` type and `APP_CONFIG` token | Public config only |
| `core/api/` | HTTP client setup and interceptors | Added with the API client ticket |
| `features/<name>/` | Routed pages and feature-specific code | One folder per feature |
| `shared/` | Reusable presentational UI | Create on first real use |
| `mocks/` | Mock data and handlers | Create on first real use |

Root files: `app.ts` (renders the shell), `app.config.ts` (providers), `app.routes.ts` (routing table).

## Routes

| Path | Component | Access | Notes |
| --- | --- | --- | --- |
| `/` | `features/home/Home` | Public | Landing page |
| `/sign-in` | `features/auth/SignIn` | Public | Stub; will redirect to the identity provider |
| `/auth/callback` | `features/auth/AuthCallback` | Public | Stub; must match `AppConfig.auth.redirectPath` |
| `/dashboard` | `features/dashboard/Dashboard` | Protected (`canMatch: [authGuard]`) | Demo protected route |
| `**` | `features/not-found/NotFound` | Public | Fallback for unknown URLs, and for protected routes when the guard rejects |

All routes are lazy-loaded and set a page `title`.

**Guard attachment point:** `core/auth/auth.guard.ts` exports `authGuard`, which currently always
allows navigation. The auth ticket replaces its body with a session check that returns a
`UrlTree` to `/sign-in?returnUrl=…` for signed-out users. Routes do not need to change.

## Environment settings

Build-time configuration via Angular `fileReplacements`:

| Environment | File | Selected by | `apiBaseUrl` |
| --- | --- | --- | --- |
| local | `src/environments/environment.development.ts` | `npm start`, `ng build -c development` | `http://localhost:3000/api` |
| production | `src/environments/environment.ts` | `npm run build` (default) | `/api` (same origin) |

Settings (`AppConfig`):

- `name`: environment label.
- `apiBaseUrl`: backend base URL, no trailing slash.
- `auth.authority`, `auth.clientId`, `auth.redirectPath`: identity-provider settings
  (local points at a mock IdP).

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
npm run format:check
npm run lint
npm run test:ci
npm run build          # output: web/dist/web
```

Routing behaviour is covered by `src/app/app.routes.spec.ts` (public, protected,
guard-rejected and fallback routes).
