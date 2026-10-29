import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pantalla',
  styleUrl: './pantalla.css',
  templateUrl: './pantalla.html',
})
export class Pantalla {
  valor = input.required<string>()
}
