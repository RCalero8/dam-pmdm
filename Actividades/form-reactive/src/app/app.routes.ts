import { Routes } from '@angular/router';
import { FormEditor } from './component/form-editor/form-editor';
import { FormEditor2 } from './component/form-editor2/form-editor2';
export const routes: Routes = [
    { path: '', redirectTo: 'form-control', pathMatch: 'full' },
  { path: 'form-control', component: FormEditor, title: 'FormControl' },
  { path: 'form-group', component: FormEditor2, title: 'FormGroup' },
  { path: '**', redirectTo: 'form-control' },
];
