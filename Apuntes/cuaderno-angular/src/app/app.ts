import { Component, HostListener, computed, inject } from '@angular/core';
import { Estudio, Modo } from './estudio';
import { Hoja } from './hoja';
import { Indice } from './indice';
import { Repaso } from './repaso';

@Component({
  selector: 'app-root',
  imports: [Hoja, Indice, Repaso],
  template: `
  <header class="portada">
    <h1>📕 Cuaderno de apuntes de Angular</h1>
    <p>Outputs · Formularios · Routing · HTTP · Bindings · Plantillas · Signals · Reactive forms · Validadores</p>
  </header>

  <div class="barra">
    <div class="barra-int">
      <div class="tabs">
        @for (m of modos; track m.id) {
          <button type="button" class="tab" [class.activo]="est.modo() === m.id" (click)="est.modo.set(m.id)">{{ m.etiqueta }}</button>
        }
      </div>
      <div class="progreso" title="Apartados marcados como vistos">
        <div class="progreso-barra"><i [style.width.%]="est.progreso()"></i></div>
        <span>{{ est.vistos().size }}/{{ est.total }} vistos ({{ est.progreso() }}%)</span>
      </div>
      @if (est.modo() === 'apuntes') {
        <button type="button" class="tab" (click)="est.abrirTodasLasHojas(true)">Abrir hojas</button>
        <button type="button" class="tab" (click)="est.abrirTodasLasHojas(false)">Cerrar hojas</button>
      }
      <button type="button" class="tab" (click)="reiniciar()">↺ Reiniciar progreso</button>
    </div>
  </div>

  <div class="contenedor">
    <app-indice />
    <main class="hojas">
      @switch (est.modo()) {
        @case ('repaso') { <app-repaso /> }
        @case ('foco') {
          <app-hoja [seccion]="actual()" [fija]="true" />
          <div class="pager">
            <button type="button" class="btn" [disabled]="indiceActual() === 0" (click)="est.mover(-1)">← Anterior</button>
            <span class="fuente">Hoja {{ indiceActual() + 1 }} de {{ est.secciones.length }} · usa ← →</span>
            <button type="button" class="btn primario" [disabled]="indiceActual() === est.secciones.length - 1" (click)="est.mover(1)">Siguiente →</button>
          </div>
        }
        @default {
          @for (s of est.visibles(); track s.id) { <app-hoja [seccion]="s" /> }
          @empty { <p class="vacio">No hay apuntes que coincidan con la búsqueda.</p> }
        }
      }
    </main>
  </div>

  <footer class="pie">
    Apuntes elaborados a partir de la documentación oficial de Angular (angular.dev y v20.angular.dev).
    Los apartados de binding, plantillas y signals provienen de la documentación de la v20; el resto, de la versión actual del sitio.
  </footer>`,
})
export class App {
  est = inject(Estudio);
  modos: { id: Modo; etiqueta: string }[] = [
    { id: 'apuntes', etiqueta: '📖 Todas las hojas' },
    { id: 'foco', etiqueta: '🎯 Una a una' },
    { id: 'repaso', etiqueta: '🧠 Repaso' },
  ];
  indiceActual = computed(() => this.est.secciones.findIndex((s) => s.id === this.est.activa()));
  actual = computed(() => this.est.secciones[Math.max(0, this.indiceActual())]);

  reiniciar() { if (confirm('¿Borrar todo tu progreso de estudio?')) this.est.reiniciar(); }

  @HostListener('window:keydown', ['$event'])
  tecla(e: KeyboardEvent) {
    if (this.est.modo() !== 'foco' || (e.target as HTMLElement).matches?.('input, select, textarea')) return;
    if (e.key === 'ArrowRight') this.est.mover(1);
    if (e.key === 'ArrowLeft') this.est.mover(-1);
  }
}
