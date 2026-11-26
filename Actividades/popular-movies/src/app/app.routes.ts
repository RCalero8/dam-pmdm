import { Routes } from '@angular/router';
import { PopularMoviesPage } from './pages/popular-movies-page/popular-movies-page';

export const routes: Routes = [
  { path: '', redirectTo: 'popular-movies', pathMatch: 'full' },
  { path: 'popular-movies', component: PopularMoviesPage },
  { path: '**', redirectTo: 'popular-movies' }
];
