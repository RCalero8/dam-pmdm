import { Component, inject } from '@angular/core';
import { Estudio } from './estudio';

@Component({
  selector: 'app-indice',
  template: `
  <nav class="indice">
    <h2>Índice</h2>
    @if (est.modo() === 'apuntes') {
      <input class="buscador" type="search" placeholder="🔎 Buscar en los apuntes…"
             [value]="est.busqueda()" (input)="est.busqueda.set($any($event.target).value)">
    }
    <ol>
      @for (s of est.listaIndice(); track s.id) {
        <li [class.activa]="est.activa() === s.id" [class.hecha]="est.hechos(s) === s.subs.length">
          <a [attr.href]="'#' + s.id" (click)="$event.preventDefault(); est.irA(s.id)">
            <span>{{ s.titulo }}</span>
            <span class="cuenta">{{ est.hechos(s) === s.subs.length ? '✓' : est.hechos(s) + '/' + s.subs.length }}</span>
          </a>
        </li>
      } @empty {
        <li>Sin resultados</li>
      }
    </ol>
  </nav>`,
})
export class Indice { est = inject(Estudio); }
