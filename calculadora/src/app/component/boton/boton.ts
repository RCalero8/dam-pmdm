import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-boton',
  styleUrl: './boton.css',
  templateUrl: './boton.html',
})
export class Boton {
  texto = input.required<string>();
  activo = input(false)
  deshabilitado = input(false)

  pulsado = output<void>();
}
