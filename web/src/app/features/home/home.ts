import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Cycling Dashboard</h1>
    <p>Track your rides, routes and training trends.</p>
    <a routerLink="/dashboard">Go to your dashboard</a>
  `,
})
export class Home {}
