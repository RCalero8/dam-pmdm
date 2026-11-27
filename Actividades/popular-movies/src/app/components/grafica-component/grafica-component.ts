import { Component, inject, OnInit, signal } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-grafica-component',
  imports: [NgxChartsModule],
  templateUrl: './grafica-component.html',
  styleUrl: './grafica-component.css'
})
export class GraficaComponent implements OnInit {
  private moviesService = inject(MoviesService);

  datos = signal<{ name: string; value: number }[]>([]);

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe({
      next: (resp) => {
        const grafica = resp.results.slice(0, 10).map((movie) => ({
          name: movie.title,
          value: movie.vote_average
        }));
        this.datos.set(grafica);
      },
      error: (err) => console.error('Error al cargar la gráfica', err)
    });
  }
}