import { Component, signal } from '@angular/core';
import { Toolbar } from './components/toolbar/toolbar';
import { CarItem } from './components/car-item/car-item';
@Component({
  imports: [ Toolbar, CarItem],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('prueba');
}
