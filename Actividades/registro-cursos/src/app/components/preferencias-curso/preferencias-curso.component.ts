import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BloqueBase } from '../bloque-base';
import { CampoErroresComponent } from '../campo-errores/campo-errores.component';

@Component({
  selector: 'app-preferencias-curso',
  standalone: true,
  imports: [ReactiveFormsModule, CampoErroresComponent],
  templateUrl: './preferencias-curso.component.html'
})
export class PreferenciasCursoComponent extends BloqueBase {
  cursos = ['Angular', 'React', 'Java', 'Python', 'Node.js', 'SQL'];

  msgCurso = { required: 'Selecciona un curso' };
  msgHoras = {
    required: 'Entre 2 y 40 horas', min: 'Entre 2 y 40 horas', max: 'Entre 2 y 40 horas'
  };
  msgCp = { required: 'Código postal no válido', pattern: 'Código postal no válido' };
}
