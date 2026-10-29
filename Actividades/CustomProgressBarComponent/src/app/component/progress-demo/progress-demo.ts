import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomProgressBarComponent } from '../custom-progress-bar/custom-progress-bar';

@Component({
  selector: 'app-progress-demo',
  imports: [FormsModule, CustomProgressBarComponent],
  templateUrl: './progress-demo.html',
})
export class ProgressDemo {
  value = 0;
  color = 'primary';
  striped = false;
  animated = false;
  showText = true;
}
