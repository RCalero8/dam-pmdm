import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopularMoviesResponse } from '../models/popular-movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://api.themoviedb.org/3';
  // TODO: pon aquí tu API Key de TMDB (la v3)
  private readonly API_KEY = '70ca24e07981af006a4bac3bc7dec2fe';

  getPopularMovies(): Observable<PopularMoviesResponse> {
    return this.http.get<PopularMoviesResponse>(
      `${this.API_URL}/movie/popular?api_key=${this.API_KEY}&language=es-ES&page=1`
    );
  }
}
