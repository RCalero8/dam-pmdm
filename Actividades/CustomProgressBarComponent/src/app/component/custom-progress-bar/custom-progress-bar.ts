import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  imports: [],
  templateUrl: './custom-progress-bar.html',
})
export class CustomProgressBarComponent {

  value = input<number>(0);
  color = input<string>('primary');
  
  striped = input<boolean>(false);
  animated = input<boolean>(false);
  showText = input<boolean>(false);
  height = input<number>(20);

  safeValue = computed(() => Math.min(100, Math.max(0, this.value())));
}