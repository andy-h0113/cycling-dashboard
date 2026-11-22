import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Stub: the auth ticket replaces this with a redirect to the identity provider. */
@Component({
  selector: 'app-sign-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Sign in</h1>
    <p>Sign-in is not implemented yet.</p>
  `,
})
export class SignIn {}
