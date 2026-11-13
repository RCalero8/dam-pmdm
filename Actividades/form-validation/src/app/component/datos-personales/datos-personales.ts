import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-datos-personales',
  styleUrl: './datos-personales.css',
  templateUrl: './datos-personales.html',
})
export class DatosPersonales {
  pMay = '^.*[A-Z].*$';
  pMin = '^.*[a-z].*$';
  pNum = '^.*\\d.*$';
  pEsp = '^.*[^A-Za-z0-9].*$';

  cursos = ['Java', 'Python', 'Angular', 'Spring Boot', 'Bases de datos'];

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$')]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$')]),
    dni: new FormControl('', [Validators.required, Validators.pattern('^(\\d{8}|[XYZxyz]\\d{7})[A-Za-z]$')]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^(\\+34)?[67]\\d{8}$')]),
    usuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern('^[A-Za-z][A-Za-z0-9_]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(20),
      Validators.pattern(this.pMay), Validators.pattern(this.pMin),
      Validators.pattern(this.pNum), Validators.pattern(this.pEsp),
    ]),
    curso: new FormControl('', [Validators.required]),
    horas: new FormControl<number | null>(null, [Validators.required, Validators.min(2), Validators.max(40)]),
    cp: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|[1-4]\\d|5[0-2])\\d{3}$')]),
  });
}
