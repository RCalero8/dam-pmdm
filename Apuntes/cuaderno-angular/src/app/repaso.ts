import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { Confiable, copiarCodigo } from './confiable';
import { Estudio, clave } from './estudio';

const hash = (s: string) => { let x = 0; for (const c of s) x = (x * 31 + c.charCodeAt(0)) | 0; return x; };

@Component({
  selector: 'app-repaso',
  imports: [Confiable],
  template: `
  <section class="hoja">
    <div class="hoja-cab"><h2>🧠 Modo repaso</h2></div>
    <p class="fuente">Lee el título, intenta recordar el contenido y pulsa «Mostrar respuesta». Son los mismos apuntes, ocultos hasta que los pidas.</p>

    <div class="repaso-opciones">
      <label>Hoja:
        <select (change)="est.filtroRepaso.set($any($event.target).value)">
          <option value="todas" [selected]="est.filtroRepaso() === 'todas'">Todas</option>
          @for (s of est.secciones; track s.id) {
            <option [value]="s.id" [selected]="est.filtroRepaso() === s.id">{{ s.numero }}. {{ s.titulo }}</option>
          }
        </select>
      </label>
      <label><input type="checkbox" [checked]="soloPend()" (change)="cambiarPend($any($event.target).checked)"> Solo pendientes</label>
      <button type="button" class="btn mini" (click)="barajar()">🔀 Barajar</button>
      <button type="button" class="btn mini" (click)="est.sabidas.set(new_set())">↺ Quitar marcas</button>
    </div>

    @if (carta(); as c) {
      <article class="carta">
        <div class="carta-meta">Hoja {{ c.sec.numero }} · {{ c.sec.titulo }} — Tarjeta {{ idx() + 1 }} de {{ mazo().length }}
          · Sabidas: {{ est.sabidas().size }}/{{ est.total }}</div>
        <p class="carta-pregunta">¿Qué recuerdas de…? <span [innerHTML]="c.sub.titulo | confiable"></span></p>
        @if (!mostrar()) {
          <button type="button" class="btn primario" (click)="mostrar.set(true)">Mostrar respuesta</button>
        } @else {
          <div class="contenido" [innerHTML]="c.sub.html | confiable" (click)="copiar($event)"></div>
          <div class="acciones">
            <button type="button" class="btn" (click)="responder(false)">😅 Repasar otra vez</button>
            <button type="button" class="btn primario" (click)="responder(true)">✅ Lo sabía</button>
          </div>
        }
      </article>
    } @else {
      <p class="vacio">🎉 No quedan tarjetas pendientes aquí. Cambia de hoja o quita las marcas.</p>
    }
  </section>`,
})
export class Repaso {
  est = inject(Estudio);
  soloPend = signal(false);
  mostrar = signal(false);
  pos = signal(0);
  semilla = signal('');
  copiar = copiarCodigo;
  new_set = () => new Set<string>();

  mazo = computed(() => {
    const f = this.est.filtroRepaso();
    const sab = this.est.sabidas();
    const lista = this.est.secciones
      .filter((s) => f === 'todas' || s.id === f)
      .flatMap((sec) => sec.subs.map((sub, i) => ({ sec, sub, k: clave(sec, i) })))
      .filter((x) => !this.soloPend() || !sab.has(x.k));
    const sem = this.semilla();
    return sem ? lista.sort((a, b) => hash(a.k + sem) - hash(b.k + sem)) : lista;
  });
  idx = computed(() => Math.max(0, Math.min(this.pos(), this.mazo().length - 1)));
  carta = computed(() => this.mazo()[this.idx()] ?? null);

  constructor() {
    effect(() => {
      this.est.filtroRepaso();
      untracked(() => { this.pos.set(0); this.mostrar.set(false); });
    });
  }
  barajar() { this.semilla.set(String(Math.random())); this.pos.set(0); this.mostrar.set(false); }
  cambiarPend(v: boolean) { this.soloPend.set(v); this.pos.set(0); this.mostrar.set(false); }
  responder(ok: boolean) {
    const c = this.carta();
    if (!c) return;
    this.est.marcarSabida(c.k, ok);
    if (ok) this.est.marcarVisto(c.k);
    this.mostrar.set(false);
    if (!(ok && this.soloPend())) this.pos.set(this.idx() + 1 >= this.mazo().length ? 0 : this.idx() + 1);
  }
}
