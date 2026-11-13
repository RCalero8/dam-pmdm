import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosPersonalesComponent } from '../../components/datos-personales/datos-personales.component';
import { DatosCuentaComponent } from '../../components/datos-cuenta/datos-cuenta.component';
import { PreferenciasCursoComponent } from '../../components/preferencias-curso/preferencias-curso.component';
import {
  CP, DNI_NIE, MOVIL, SOLO_LETRAS, USUARIO, letraDni, regla
} from '../../validators/validadores';

@Component({
  selector: 'app-formulario-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatosPersonalesComponent,
    DatosCuentaComponent,
    PreferenciasCursoComponent
  ],
  templateUrl: './formulario-page.component.html'
})
export class FormularioPageComponent {
  enviado = false;

  form = new FormGroup({
    personales: new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(SOLO_LETRAS)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(SOLO_LETRAS)]),
      dni: new FormControl('', [Validators.required, Validators.pattern(DNI_NIE), letraDni]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(MOVIL)])
    }),
    cuenta: new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(USUARIO)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.maxLength(20),
        regla('mayuscula', /[A-Z]/), regla('minuscula', /[a-z]/),
        regla('numero', /[0-9]/), regla('especial', /[^A-Za-z0-9]/)
      ])
    }),
    preferencias: new FormGroup({
      curso: new FormControl('', Validators.required),
      horas: new FormControl<number | null>(null, [Validators.required, Validators.min(2), Validators.max(40)]),
      cp: new FormControl('', [Validators.required, Validators.pattern(CP)])
    })
  });

  enviar(): void {
    this.form.markAllAsTouched();
    this.enviado = this.form.valid;
    console.log(this.form.valid ? this.form.value : 'Formulario inválido');
  }
}
