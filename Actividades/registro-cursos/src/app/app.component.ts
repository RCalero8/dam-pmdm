import { Component } from '@angular/core';
import { FormularioPageComponent } from './pages/formulario-page/formulario-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormularioPageComponent],
  template: '<app-formulario-page />'
})
export class AppComponent {}
