import { Component } from '@angular/core';
import { PokemonItems } from '../pokemon-items/pokemon-items';

const POKEMONS: Pokemon[] = [
  {id: 1,
    numero: "001",
    name : "Bulbasaur",
    tipo: "Planta y Veneno",
    img: "https://i.etsystatic.com/12427486/r/il/7acd84/5398417851/il_570xN.5398417851_iq0i.jpg"
  },
  {id: 2,
    numero: "004",
    name : "Charmander",
    tipo: "Fuego",
    img: "https://i.pinimg.com/originals/c0/bd/2e/c0bd2efbe489976adb8694d8ab477107.jpg"
  },
  {id: 3,
    numero : "006",
    name : "Charizard",
    tipo: "Fuego y Volador",
    img: "https://png.pngtree.com/png-vector/20250805/ourlarge/pngtree-charizard-soaring-through-the-fantasy-sky-with-flames-on-its-tail-png-image_16974083.webp"
  },
   {id: 4,
    numero: "007",
    name : "Squirtle",
    tipo: "Agua",
    img: "https://i.etsystatic.com/50571582/r/il/1f18a8/6105017810/il_fullxfull.6105017810_6bvx.jpg"
  },
  {id: 5,
    numero: "133",
    name : "Eevee",
    tipo: "Normal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPqd214fYkJesVTOWGESw3QtbyQ77qZjP4jbgbMOO5lvnXF_v9B_KIuM&s=10"
  },
  {id: 6,
    numero : "025",
    name : "Pikachu",
    tipo: "Electricidad",
    img: "https://i.pinimg.com/736x/ea/34/e7/ea34e7c9e9c37d5a59d3c4bb1a9accff.jpg"
  }
]


@Component({
  imports: [PokemonItems],
  selector: 'app-pokemon-list',
  styleUrl: './pokemon-list.css',
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  pokemonList = POKEMONS;
}
