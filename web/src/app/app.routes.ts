import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

const appName = 'Cycling Dashboard';

export const routes: Routes = [
  // Public
  {
    path: '',
    pathMatch: 'full',
    title: appName,
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'sign-in',
    title: `Sign in · ${appName}`,
    loadComponent: () => import('./features/auth/sign-in').then((m) => m.SignIn),
  },
  {
    // Must match AppConfig.auth.redirectPath.
    path: 'auth/callback',
    title: `Signing in · ${appName}`,
    loadComponent: () => import('./features/auth/auth-callback').then((m) => m.AuthCallback),
  },

  // Protected
  {
    path: 'dashboard',
    title: `Dashboard · ${appName}`,
    canMatch: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },

  // Fallback
  {
    path: '**',
    title: `Not found · ${appName}`,
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
