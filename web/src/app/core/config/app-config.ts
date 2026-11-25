import { InjectionToken } from '@angular/core';

/**
 * Runtime-visible app configuration.
 *
 * Everything here ships to the browser, so it must only ever contain PUBLIC
 * values (URLs, feature flags). Never put secrets, API keys or
 * client secrets here.
 */
export interface AppConfig {
  /** Name of the environment this build targets, e.g. "local" or "production". */
  readonly name: string;
  /** Base URL for the backend API (no trailing slash). */
  readonly apiBaseUrl: string;
}

/** Inject this instead of importing `environment` directly, so tests can override it. */
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
