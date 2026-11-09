import { Component } from '@angular/core';
import { ProgressDemo } from './component/progress-demo/progress-demo';

@Component({
  selector: 'app-root',
  imports: [ProgressDemo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}