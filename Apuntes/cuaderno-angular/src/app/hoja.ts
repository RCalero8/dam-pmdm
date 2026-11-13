import { Component, computed, inject, input } from '@angular/core';
import { Confiable, copiarCodigo } from './confiable';
import { Estudio, clave } from './estudio';
import { Seccion } from './modelos';

@Component({
  selector: 'app-hoja',
  imports: [Confiable],
  template: `
  <section class="hoja" [id]="seccion().id" [class.estudiada]="completa()">
    <div class="hoja-cab">
      <button type="button" class="hoja-toggle" [attr.aria-expanded]="abierta()"
              (click)="!fija() && est.alternarHoja(seccion().id)">
        <span class="chevron">▸</span>
        <h2>{{ seccion().numero }}. {{ seccion().titulo }}</h2>
        <span class="insignia">{{ hechos() }}/{{ seccion().subs.length }}</span>
      </button>
    </div>

    <div class="ventana" [class.abierta]="abierta()">
      <div class="ventana-int">
        <p class="fuente" [innerHTML]="seccion().fuente | confiable"></p>
        <div class="contenido" [innerHTML]="seccion().intro | confiable" (click)="copiar($event)"></div>

        <div class="herramientas">
          <button type="button" class="btn mini" (click)="est.abrirSubs(seccion(), true)">📂 Abrir todo</button>
          <button type="button" class="btn mini" (click)="est.abrirSubs(seccion(), false)">📁 Cerrar todo</button>
          <button type="button" class="btn mini" (click)="est.marcarHoja(seccion(), !completa())">
            {{ completa() ? '↺ Quitar marcas' : '✅ Marcar hoja como estudiada' }}
          </button>
        </div>

        @for (x of items().lista; track x.k) {
          <div class="sub" [class.visto]="est.vistos().has(x.k)">
            <div class="sub-cab">
              <button type="button" class="sub-toggle" [attr.aria-expanded]="subAbierta(x.k)"
                      (click)="est.alternarSub(x.k)">
                <span class="chevron">▸</span>
                <span [innerHTML]="x.sub.titulo | confiable"></span>
              </button>
              <label class="vc">
                <input type="checkbox" [checked]="est.vistos().has(x.k)" (change)="est.alternarVisto(x.k)">
                Visto
              </label>
            </div>
            <div class="ventana" [class.abierta]="subAbierta(x.k)">
              <div class="ventana-int">
                <div class="sub-cuerpo contenido" [innerHTML]="x.sub.html | confiable" (click)="copiar($event)"></div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </section>`,
})
export class Hoja {
  est = inject(Estudio);
  seccion = input.required<Seccion>();
  fija = input(false);

  items = computed(() => {
    const s = this.seccion();
    const q = this.est.consulta();
    const todos = s.subs.map((sub, i) => ({ sub, k: clave(s, i) }));
    const coinciden = q ? todos.filter((x) => x.sub.buscar.includes(q)) : todos;
    return { lista: coinciden.length ? coinciden : todos, forzar: !!q && coinciden.length > 0 };
  });
  abierta = computed(() => this.fija() || !!this.est.consulta() || this.est.abiertas().has(this.seccion().id));
  hechos = computed(() => this.est.hechos(this.seccion()));
  completa = computed(() => this.hechos() === this.seccion().subs.length);

  subAbierta(k: string) { return this.items().forzar || this.est.subsAbiertas().has(k); }
  copiar = copiarCodigo;
}
