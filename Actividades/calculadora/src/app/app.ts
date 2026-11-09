import { Component, signal } from '@angular/core';
import { Calculadora } from './components/calculadora/calculadora';

@Component({
  imports: [Calculadora],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
 
}
