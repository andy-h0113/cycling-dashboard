import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Stub: the identity provider redirects here after sign-in. The auth ticket
 * replaces this with token/session handling and a redirect to `returnUrl`.
 */
@Component({
  selector: 'app-auth-callback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p role="status">Completing sign-in…</p>`,
})
export class AuthCallback {}
