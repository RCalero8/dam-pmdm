import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './pages/register-form/register-form';

@Component({
  imports: [RouterOutlet, RegisterForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('form-trail-sierra-norte');
}
