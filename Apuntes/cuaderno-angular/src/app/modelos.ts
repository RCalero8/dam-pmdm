export interface Subseccion { titulo: string; html: string; buscar: string; }
export interface Seccion {
  id: string; numero: number; titulo: string; fuente: string;
  intro: string; subs: Subseccion[]; buscar: string;
}
