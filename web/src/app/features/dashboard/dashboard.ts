import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APP_CONFIG } from '../../core/config/app-config';

/** Protected demo route. Real dashboard content arrives in later tickets. */
@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Dashboard</h1>
    <p>This route is protected by <code>authGuard</code>.</p>
    <p>
      Environment: <strong>{{ config.name }}</strong> · API: <code>{{ config.apiBaseUrl }}</code>
    </p>
  `,
})
export class Dashboard {
  protected readonly config = inject(APP_CONFIG);
}
