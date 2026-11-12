import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-datos-personales',
  styleUrl: './datos-personales.css',
  templateUrl: './datos-personales.html',
})
export class DatosPersonales {
  
  personalForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/)
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/)
    ]),
    dni: new FormControl(),
    tlfn: new FormControl()
  });

  //Nombre
  get nombre() {
    return this.personalForm.controls.nombre;
  }
  get nombreValido(): boolean {
    return this.nombre.valid && (this.nombre.touched || this.nombre.dirty);
  }
  get nombreError(): string {
    if (this.nombre.hasError('required')) return 'El nombre es obligatorio';
    if (this.nombre.hasError('minlength')) return 'Mínimo 2 caracteres';
    if (this.nombre.hasError('maxlength')) return 'Máximo 30 caracteres';
    if (this.nombre.hasError('pattern')) return 'Solo se permiten letras';
    return '';
  }

  //Apellido
  get apellido() {
    return this.personalForm.controls.apellido;
  }
  get apellidoValido(): boolean {
    return this.apellido.valid && (this.apellido.touched || this.apellido.dirty);
  }
  get apellidoError(): string {
    if (this.apellido.hasError('required')) return 'El apellido es obligatorio';
    if (this.apellido.hasError('minlength')) return 'Mínimo 2 caracteres';
    if (this.apellido.hasError('maxlength')) return 'Máximo 50 caracteres';
    if (this.apellido.hasError('pattern')) return 'Solo se permiten letras';
    return '';
  }
}
