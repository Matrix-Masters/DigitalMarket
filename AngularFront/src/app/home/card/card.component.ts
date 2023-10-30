import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  implements OnInit{
isFavorite:boolean = false;

@Input() products:any
  toggleFavorite():void{
    this.isFavorite = !this.isFavorite;
  }

  ngOnInit(): void {

  }
}
