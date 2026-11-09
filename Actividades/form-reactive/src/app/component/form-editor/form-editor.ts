import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  selector: 'app-form-editor',
  styleUrl: './form-editor.css',
  templateUrl: './form-editor.html',
})
export class FormEditor {
  private destroyRef = inject(DestroyRef);
  title = new FormControl('');
  description = new FormControl('');
  category = new FormControl('');
  tags = new FormControl('');
  email = new FormControl('');

  publishNow = new FormControl(true);
   publishDate = new FormControl<NgbDateStruct | null>(null, Validators.required);

  hoy: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  constructor() {
     this.publishDate.disable(); 

    this.publishNow.valueChanges.subscribe((now) => {
      if (now) {
        this.publishDate.reset();
        this.publishDate.disable();
      } else {
        this.publishDate.enable();
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.publishDate.invalid) {
      this.publishDate.markAsTouched();
      return;
    }

    console.log({
      publishNow: this.publishNow.value,
      publishDate: this.publishNow.value ? null : this.publishDate.value,
    });
  }
}

