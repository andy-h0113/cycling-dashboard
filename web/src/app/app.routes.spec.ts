import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { APP_CONFIG, AppConfig } from './core/config/app-config';
import { Dashboard } from './features/dashboard/dashboard';
import { Home } from './features/home/home';
import { NotFound } from './features/not-found/not-found';

const testConfig: AppConfig = {
  name: 'test',
  apiBaseUrl: 'http://api.test',
};

describe('app routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: APP_CONFIG, useValue: testConfig }],
    });
    harness = await RouterTestingHarness.create();
  });

  it('renders Home at /', async () => {
    await harness.navigateByUrl('/', Home);
  });

  it('renders Dashboard at /dashboard', async () => {
    const dashboard = await harness.navigateByUrl('/dashboard', Dashboard);
    expect(dashboard).toBeTruthy();
    expect(harness.routeNativeElement?.textContent).toContain('http://api.test');
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
