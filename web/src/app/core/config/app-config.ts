import { InjectionToken } from '@angular/core';

/**
 * Runtime-visible app configuration.
 *
 * Everything here ships to the browser, so it must only ever contain PUBLIC
 * values (URLs, client IDs, feature flags). Never put secrets, API keys or
 * client secrets here.
 */
export interface AppConfig {
  /** Name of the environment this build targets, e.g. "local" or "production". */
  readonly name: string;
  /** Base URL for the backend API (no trailing slash). */
  readonly apiBaseUrl: string;
  /** Identity-provider settings. Stubbed until auth is implemented. */
  readonly auth: {
    readonly authority: string;
    readonly clientId: string;
    /** Route the identity provider redirects back to after sign-in. */
    readonly redirectPath: string;
  };
}

/** Inject this instead of importing `environment` directly, so tests can override it. */
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
