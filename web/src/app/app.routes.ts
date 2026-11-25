import { Routes } from '@angular/router';

const appName = 'Cycling Dashboard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: appName,
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'dashboard',
    title: `Dashboard · ${appName}`,
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },

  // Fallback
  {
    path: '**',
    title: `Not found · ${appName}`,
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
