import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


// Letras (con tildes, ü y ñ) separadas por un solo espacio, sin espacios al principio ni al final
export const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
// 9 dígitos que empiezan por 6, 7, 8 o 9, con +34 delante opcional (con o sin espacio)
export const TELEFONO = /^(\+34 ?)?[6-9]\d{8}$/;
// Como SOLO_LETRAS, pero las palabras pueden ir separadas por espacio o guion
export const NOMBRE_MASCOTA = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+([ -][a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
// Exactamente 15 dígitos
export const MICROCHIP = /^\d{15}$/;
// Al menos una minúscula, una mayúscula y un número, sin espacios (la longitud la controlan minLength/maxLength)
export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/;
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})

export class Formulario {
  
  especie = ['Perro', 'Gato', 'Ave', 'Otro'];

  form = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(SOLO_LETRAS)
    ]),
    apellidos: new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(50), 
      Validators.pattern(SOLO_LETRAS)
    ]),
    telefono: new FormControl('', [
      Validators.required, 
      Validators.pattern(TELEFONO)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    mascota: new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(20), 
      Validators.pattern(NOMBRE_MASCOTA)
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(24),
      Validators.pattern(PASSWORD)
    ]),
    especie: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.maxLength(40)),
    edad: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(0)
    ]),
    peso: new FormControl('',[
      Validators.required,
      Validators.maxLength(90),
      Validators.minLength(0.1)
    ]),
    microchip: new FormControl('', [
      Validators.required,
      Validators.pattern(MICROCHIP)
    ]),
    primeraVisita: new FormControl('',[
      Validators.required,
      Validators.maxLength(300),
      Validators.minLength(10)
    ]),
    politicaPrivacidad: new FormControl('', Validators.requiredTrue),
    recordatorio: new FormControl('')
  });

}

