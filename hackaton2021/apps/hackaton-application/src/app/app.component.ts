import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'hackaton2021-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hackaton-application';
  constructor(updates: SwUpdate) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => document.location.reload);
    });
  }
}
