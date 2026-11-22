import type { AppConfig } from '../app/core/config/app-config';

/**
 * Local development configuration (used by `ng serve` and
 * `ng build --configuration development` via fileReplacements in angular.json).
 * Public values only: this file is bundled into the browser build.
 */
export const environment: AppConfig = {
  name: 'local',
  apiBaseUrl: 'http://localhost:3000/api',
  auth: {
    authority: 'http://localhost:3000/mock-idp',
    clientId: 'cycling-dashboard-web-local',
    redirectPath: '/auth/callback',
  },
};
