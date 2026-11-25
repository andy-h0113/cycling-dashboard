import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Fallback for any URL that does not match a route. */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Page not found</h1>
    <p>The page you are looking for does not exist.</p>
    <a routerLink="/">Back to home</a>
  `,
})
export class NotFound {}
