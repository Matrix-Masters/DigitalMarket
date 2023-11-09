import { Component, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-accueil-cart',
  templateUrl: './accueil-cart.component.html',
  styleUrls: ['./accueil-cart.component.scss']
})
export class AccueilCartComponent implements OnInit{

  constructor(public productServiceStorage:ProductsServiceLocalStorageService,private location: Location){}
products:any


getListProducts(){
  const productString = localStorage.getItem('products');
  if(productString) {
    this.products = JSON.parse(productString);
  }
}

clearAll(){
  this.productServiceStorage.clearProductList();
  this.location.replaceState('/cart');
  location.reload();
}

  ngOnInit(): void {
    this.getListProducts()
  }

}
