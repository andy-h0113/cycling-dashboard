import { CanMatchFn } from '@angular/router';

/**
 * Guard attachment point for protected routes.
 *
 * Placeholder: always allows navigation. The auth ticket replaces the body with
 * a real session check that redirects unauthenticated users, e.g.
 *
 *   const auth = inject(AuthService);
 *   const router = inject(Router);
 *   return auth.isSignedIn() || router.createUrlTree(['/sign-in'], {
 *     queryParams: { returnUrl: '/' + segments.map((s) => s.path).join('/') },
 *   });
 *
 * Routes opt in with `canMatch: [authGuard]`, so the routing table does not
 * need to change when the real implementation lands.
 */
export const authGuard: CanMatchFn = () => true;
