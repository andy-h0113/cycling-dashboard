import type { AppConfig } from '../app/core/config/app-config';

/**
 * Production / deployed configuration (default for `ng build`).
 * Public values only: this file is bundled into the browser build.
 */
export const environment: AppConfig = {
  name: 'production',
  apiBaseUrl: '/api',
};
