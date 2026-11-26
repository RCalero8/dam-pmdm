import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

export const SOLO_LETRAS =  /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
export const TELEFONO = /^(\+34 ?)?[6-9]\d{8}$/;
export const CODIGO_FEDERADO = /^FED-\d{4}$/;
export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register-form',
  styleUrl: './register-form.css',
  templateUrl: './register-form.html',
})
export class RegisterForm {
  modalidad = ['10k', '21k', '42k']
  form = new FormGroup({
    datosPersonales:new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(SOLO_LETRAS)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      tel: new FormControl('', [
        Validators.required,
        Validators.pattern(TELEFONO)
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(PASSWORD)
      ]),
    }),
    datosCarrera: new FormGroup({
      modalidad: new FormControl('10k', Validators.required),
      categoria: new FormControl('', Validators.required),
      edad: new FormControl('',[
        Validators.required,
        Validators.min(18),
        Validators.max(85)
      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern(CODIGO_FEDERADO)
      ]),
      alergia: new FormControl('', Validators.maxLength(200)),
    }),
    condiciones: new FormGroup({
      acepto: new FormControl('', Validators.requiredTrue),
      gps: new FormControl(true)
    })
  })


}
