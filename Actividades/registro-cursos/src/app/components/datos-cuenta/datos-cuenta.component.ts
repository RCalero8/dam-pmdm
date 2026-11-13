import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BloqueBase } from '../bloque-base';
import { CampoErroresComponent } from '../campo-errores/campo-errores.component';

@Component({
  selector: 'app-datos-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, CampoErroresComponent],
  templateUrl: './datos-cuenta.component.html'
})
export class DatosCuentaComponent extends BloqueBase {
  msgUsuario = {
    required: 'Entre 4 y 15 caracteres', minlength: 'Entre 4 y 15 caracteres',
    maxlength: 'Entre 4 y 15 caracteres',
    pattern: 'Debe empezar por letra y no contener espacios ni símbolos'
  };
  msgEmail = {
    required: 'El email es obligatorio', email: 'Formato de email no válido'
  };
  msgPassword = {
    required: 'La contraseña es obligatoria', minlength: 'Mínimo 8 caracteres',
    maxlength: 'Máximo 20 caracteres', mayuscula: 'Falta una mayúscula',
    minuscula: 'Falta una minúscula', numero: 'Falta un número',
    especial: 'Falta un carácter especial'
  };
}
