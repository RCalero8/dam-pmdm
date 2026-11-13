import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { APUNTES } from './datos/apuntes';
import { Seccion } from './modelos';

const CLAVE_GUARDADO = 'cuaderno-angular-v1';
export type Modo = 'apuntes' | 'foco' | 'repaso';
export const norm = (t: string) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const clave = (s: Seccion, i: number) => `${s.id}:${i}`;

@Injectable({ providedIn: 'root' })
export class Estudio {
  readonly secciones = APUNTES;
  readonly total = APUNTES.reduce((n, s) => n + s.subs.length, 0);

  readonly modo = signal<Modo>('apuntes');
  readonly activa = signal(APUNTES[0].id);
  readonly busqueda = signal('');
  readonly filtroRepaso = signal('todas');
  readonly abiertas = signal<Set<string>>(new Set([APUNTES[0].id]));
  readonly subsAbiertas = signal<Set<string>>(new Set());
  readonly vistos = signal<Set<string>>(new Set());
  readonly sabidas = signal<Set<string>>(new Set());

  readonly consulta = computed(() => norm(this.busqueda().trim()));
  readonly visibles = computed(() => {
    const q = this.consulta();
    return q ? this.secciones.filter((s) => s.buscar.includes(q)) : this.secciones;
  });
  readonly listaIndice = computed(() => (this.modo() === 'apuntes' ? this.visibles() : this.secciones));
  readonly progreso = computed(() => Math.round((100 * this.vistos().size) / this.total));

  constructor() {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE_GUARDADO) ?? '{}');
      this.vistos.set(new Set(g.vistos ?? []));
      this.sabidas.set(new Set(g.sabidas ?? []));
    } catch { /* sin progreso guardado */ }
    effect(() => {
      const datos = { vistos: [...this.vistos()], sabidas: [...this.sabidas()] };
      try { localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(datos)); } catch { /* ignorar */ }
    });
  }

  private alt(sg: WritableSignal<Set<string>>, k: string, v?: boolean) {
    sg.update((s) => {
      const n = new Set(s);
      (v ?? !n.has(k)) ? n.add(k) : n.delete(k);
      return n;
    });
  }

  alternarHoja(id: string) { this.alt(this.abiertas, id); this.activa.set(id); }
  alternarSub(k: string) { this.alt(this.subsAbiertas, k); }
  alternarVisto(k: string) { this.alt(this.vistos, k); }
  marcarVisto(k: string) { this.alt(this.vistos, k, true); }
  marcarSabida(k: string, v: boolean) { this.alt(this.sabidas, k, v); }

  hechos(s: Seccion) { return s.subs.filter((_, i) => this.vistos().has(clave(s, i))).length; }

  marcarHoja(s: Seccion, v: boolean) {
    s.subs.forEach((_, i) => this.alt(this.vistos, clave(s, i), v));
  }
  abrirSubs(s: Seccion, v: boolean) {
    s.subs.forEach((_, i) => this.alt(this.subsAbiertas, clave(s, i), v));
  }
  abrirTodasLasHojas(v: boolean) {
    this.abiertas.set(v ? new Set(this.secciones.map((s) => s.id)) : new Set());
  }

  irA(id: string) {
    this.activa.set(id);
    this.alt(this.abiertas, id, true);
    if (this.modo() === 'repaso') this.filtroRepaso.set(id);
    if (this.modo() === 'apuntes') {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }
  mover(d: number) {
    const i = this.secciones.findIndex((s) => s.id === this.activa());
    const n = Math.min(this.secciones.length - 1, Math.max(0, i + d));
    this.activa.set(this.secciones[n].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  reiniciar() { this.vistos.set(new Set()); this.sabidas.set(new Set()); }
}
