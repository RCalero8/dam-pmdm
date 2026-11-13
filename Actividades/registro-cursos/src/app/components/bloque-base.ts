import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/** Clase base de los bloques: recibe su FormGroup y decide cuándo marcar error. */
@Directive()
export abstract class BloqueBase {
  @Input({ required: true }) group!: FormGroup;

  /** Solo es true si hay error Y el usuario ha tocado o modificado el campo. */
  invalido(campo: string): boolean {
    const c = this.group.get(campo);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
}
