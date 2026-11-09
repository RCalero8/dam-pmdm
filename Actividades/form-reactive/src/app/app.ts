import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormEditor } from './component/form-editor/form-editor';

@Component({
  imports: [RouterOutlet, FormEditor ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('form-reactive');
}
