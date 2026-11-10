import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  selector: 'app-form-editor2',
  styleUrl: './form-editor2.css',
  templateUrl: './form-editor2.html',
})
export class FormEditor2 {
  private destroyRef = inject(DestroyRef);
 
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    tags: new FormControl(''),
    email: new FormControl(''),
    publishNow: new FormControl(true),
    publishDate: new FormControl<NgbDateStruct | null>(null, Validators.required),
  });
 
  hoy: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
 
  constructor() {
    this.form.controls.publishDate.disable();
 
    this.form.controls.publishNow.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((now) => {
        const publishDate = this.form.controls.publishDate;
        if (now) {
          publishDate.reset();
          publishDate.disable();
        } else {
          publishDate.enable();
        }
      });
  }
 
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    // getRawValue() incluye también los controles deshabilitados
    const value = this.form.getRawValue();
    console.log({
      ...value,
      publishDate: value.publishNow ? null : value.publishDate,
    });
  }
}
