import { Component } from '@angular/core';
const PLAYERS: Player[] =[
  {id: 1,
    fullName: "Cristiano",
    photoUrl: "https://c.files.bbci.co.uk/8B70/production/_102469653_gettyimages-962792890.jpg",
    age: 42
  }
  {id: 2,
    fullName: "Messi",
    photoUrl: "https://cdn.shopify.com/s/files/1/0697/4249/3893/files/308325fbd65f1393b8f89a68f38d0c6ea5f474b7_FOILWRAP_CARDS.png?v=1791568321",
    age: 32
  }
]

@Component({
  imports: [],
  selector: 'app-player-list',
  styleUrl: './player-list.css',
  templateUrl: './player-list.html',
})
export class PlayerList {
  
}
