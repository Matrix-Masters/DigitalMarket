import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { Product } from "../../Model/Product";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  implements OnInit{
isFavorite:boolean = false;
constructor(public productServiceStorage:ProductsServiceLocalStorageService, private MatSnackBar:MatSnackBar){}
@Input() products:any
@Input() new:boolean = true;

  toggleFavorite():void{
    this.isFavorite = !this.isFavorite;
  }

  addProduct(product :any) {
    this.productServiceStorage.addProduct(product);
    this.MatSnackBar.open("Product Added",'',{
      duration:2000,
    })
  }


  clear(){
    this.productServiceStorage.clearProductList();
  }

  ngOnInit(): void {

  }
}
