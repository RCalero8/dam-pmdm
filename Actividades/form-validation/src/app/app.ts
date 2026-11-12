import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatosPersonales } from './component/datos-personales/datos-personales';

@Component({
  imports: [RouterOutlet,DatosPersonales],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('form-validation');
}
