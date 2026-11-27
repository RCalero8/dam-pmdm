import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/popular-movies.interface';
import { GraficaComponent } from '../../components/grafica-component/grafica-component';

@Component({
  selector: 'app-popular-movies-page',
  imports: [GraficaComponent],
  templateUrl: './popular-movies-page.html',
  styleUrl: './popular-movies-page.css'
})
export class PopularMoviesPage implements OnInit {
  private moviesService = inject(MoviesService);

  movies = signal<Movie[]>([]);
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe({
      next: (resp) => this.movies.set(resp.results),
      error: (err) => console.error('Error al cargar películas', err)
    });
  }
}
