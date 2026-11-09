import { Component, signal } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonList } from './components/pokemon-list/pokemon-list';

@Component({
  imports: [NgbModule, PokemonList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pokemon_list');
}
