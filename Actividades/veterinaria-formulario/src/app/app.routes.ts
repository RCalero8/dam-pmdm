import { Routes } from '@angular/router';
import { Formulario } from './component/formulario/formulario';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: 'formulario', component: Formulario},
    {path: '', component:Formulario},
    {path: '**', component: NotFound}
];
