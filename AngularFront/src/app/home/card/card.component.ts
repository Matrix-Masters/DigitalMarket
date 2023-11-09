import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { Product } from "../../Model/Product";
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  implements OnInit{
isFavorite:boolean = false;
constructor(public productServiceStorage:ProductsServiceLocalStorageService){}
@Input() products:any
@Input() new:boolean = true;

  toggleFavorite():void{
    this.isFavorite = !this.isFavorite;
  }

  addProduct(product :any) {
    this.productServiceStorage.addProduct(product);
  }


  clear(){
    this.productServiceStorage.clearProductList();
  }

  ngOnInit(): void {

  }
}
