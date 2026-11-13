import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-campo-errores',
  standalone: true,
  templateUrl: './campo-errores.component.html'
})
export class CampoErroresComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input({ required: true }) mensajes!: Record<string, string>;

  /** Vacío hasta que el campo es touched o dirty. */
  get lista(): string[] {
    const c = this.control;
    return c && (c.touched || c.dirty)
      ? Object.keys(c.errors ?? {}).map(k => this.mensajes[k])
      : [];
  }
}
