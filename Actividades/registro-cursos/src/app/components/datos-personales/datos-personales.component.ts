import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BloqueBase } from '../bloque-base';
import { CampoErroresComponent } from '../campo-errores/campo-errores.component';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [ReactiveFormsModule, CampoErroresComponent],
  templateUrl: './datos-personales.component.html'
})
export class DatosPersonalesComponent extends BloqueBase {
  msgNombre = {
    required: 'El nombre es obligatorio', minlength: 'Mínimo 2 caracteres',
    maxlength: 'Máximo 30 caracteres', pattern: 'Solo se permiten letras'
  };
  msgApellidos = {
    required: 'Los apellidos son obligatorios', minlength: 'Mínimo 2 caracteres',
    maxlength: 'Máximo 50 caracteres', pattern: 'Solo se permiten letras'
  };
  msgDni = {
    required: 'El DNI/NIE es obligatorio', pattern: 'Formato no válido',
    letra: 'La letra no corresponde al número'
  };
  msgTelefono = {
    required: 'Introduce un móvil español válido',
    pattern: 'Introduce un móvil español válido'
  };
}
