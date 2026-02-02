import { Component, signal } from '@angular/core';
import { ArcadeCabinet } from "./arcade-cabinet/arcade-cabinet";

@Component({
  selector: 'app-root',
  imports: [ArcadeCabinet],
  template:`
    <app-arcade-cabinet></app-arcade-cabinet>
  `
})
export class App {
  protected readonly title = signal('Bad Jax');
}
