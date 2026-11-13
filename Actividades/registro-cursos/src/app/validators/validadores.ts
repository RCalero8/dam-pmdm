import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/;
export const DNI_NIE = /^([0-9]{8}|[XYZxyz][0-9]{7})[A-Za-z]$/;
export const MOVIL = /^(\+34)?[67][0-9]{8}$/;
export const USUARIO = /^[A-Za-z][A-Za-z0-9_]*$/;
export const CP = /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/;

/** Validador con clave propia, para dar un mensaje por requisito. */
export const regla = (clave: string, re: RegExp): ValidatorFn =>
  (c: AbstractControl): ValidationErrors | null =>
    re.test(c.value ?? '') ? null : { [clave]: true };

/** Comprueba la letra del DNI/NIE (solo si el formato ya es correcto). */
export const letraDni: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = String(c.value ?? '').toUpperCase();
  const numero = +v.slice(0, -1).replace('X', '0').replace('Y', '1').replace('Z', '2');
  return !DNI_NIE.test(v) || 'TRWAGMYFPDXBNJZSQVHLCKE'[numero % 23] === v.slice(-1)
    ? null
    : { letra: true };
};
