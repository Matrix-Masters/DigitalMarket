import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss']
})
export class CardCartComponent implements OnInit{
  constructor(public productServiceStorage:ProductsServiceLocalStorageService,private location: Location){}


@Input() products:any
length:any
total:number=0
updateQte(product: any) {
  this.productServiceStorage.updateQte(product);
  location.reload();
}
refresh(){
  location.reload();
}

deleteProduct(product:any){
  this.productServiceStorage.deleteProduct(product)
  this.location.replaceState('/cart');
  location.reload();
}

ngOnInit(): void {
  this.length=this.products.length;
  console.log(this.products);
  for (let index = 0; index < this.products.length; index++) {
    this.total = Number(this.products[index].prix) * Number(this.products[index].quantity)
  }
}


}
