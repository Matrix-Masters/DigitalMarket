import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
isFavorite:boolean = false;

  toggleFavorite():void{
    this.isFavorite = !this.isFavorite;
  }
}
