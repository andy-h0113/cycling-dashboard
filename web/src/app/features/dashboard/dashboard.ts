import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APP_CONFIG } from '../../core/config/app-config';

/** Dashboard page. Placeholder until real ride data is wired in. */
@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Dashboard</h1>
    <p>
      Environment: <strong>{{ config.name }}</strong> · API: <code>{{ config.apiBaseUrl }}</code>
    </p>
  `,
})
export class Dashboard {
  protected readonly config = inject(APP_CONFIG);
}
