import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pokemon-items',
  styleUrl: './pokemon-items.css',
  templateUrl: './pokemon-items.html',
})
export class PokemonItems {
  pokemon = input<Pokemon>()
}
