import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { authGuard } from './core/auth/auth.guard';
import { APP_CONFIG, AppConfig } from './core/config/app-config';
import { AuthCallback } from './features/auth/auth-callback';
import { SignIn } from './features/auth/sign-in';
import { Dashboard } from './features/dashboard/dashboard';
import { Home } from './features/home/home';
import { NotFound } from './features/not-found/not-found';

const testConfig: AppConfig = {
  name: 'test',
  apiBaseUrl: 'http://api.test',
  auth: { authority: 'http://idp.test', clientId: 'test', redirectPath: '/auth/callback' },
};

describe('app routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: APP_CONFIG, useValue: testConfig }],
    });
    harness = await RouterTestingHarness.create();
  });

  describe('public routes', () => {
    it('renders Home at /', async () => {
      await harness.navigateByUrl('/', Home);
    });

    it('renders SignIn at /sign-in', async () => {
      await harness.navigateByUrl('/sign-in', SignIn);
    });

    it('renders AuthCallback at the configured redirect path', async () => {
      await harness.navigateByUrl(testConfig.auth.redirectPath, AuthCallback);
    });
  });

  describe('protected routes', () => {
    it('renders Dashboard at /dashboard while the guard allows it', async () => {
      const dashboard = await harness.navigateByUrl('/dashboard', Dashboard);
      expect(dashboard).toBeTruthy();
      expect(harness.routeNativeElement?.textContent).toContain('http://api.test');
    });

    it('attaches authGuard to /dashboard', () => {
      const route = routes.find((r) => r.path === 'dashboard');
      expect(route?.canMatch).toContain(authGuard);
    });

    it('falls through to NotFound when the guard rejects', async () => {
      const blockingRoutes = routes.map((r) =>
        r.path === 'dashboard' ? { ...r, canMatch: [() => false] } : r,
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideRouter(blockingRoutes), { provide: APP_CONFIG, useValue: testConfig }],
      });
      const blockedHarness = await RouterTestingHarness.create();
      await blockedHarness.navigateByUrl('/dashboard', NotFound);
    });
  });

  describe('fallback', () => {
    it('renders NotFound for unknown URLs', async () => {
      await harness.navigateByUrl('/does-not-exist', NotFound);
    });
  });

  describe('titles', () => {
    it('sets a page title per route', async () => {
      await harness.navigateByUrl('/dashboard');
      expect(document.title).toBe('Dashboard · Cycling Dashboard');
    });
  });
});
