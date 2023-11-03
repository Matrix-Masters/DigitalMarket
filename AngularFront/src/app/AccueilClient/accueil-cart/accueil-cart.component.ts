import { Component, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';

@Component({
  selector: 'app-accueil-cart',
  templateUrl: './accueil-cart.component.html',
  styleUrls: ['./accueil-cart.component.scss']
})
export class AccueilCartComponent implements OnInit{

  constructor(public productServiceStorage:ProductsServiceLocalStorageService){}
products:any


getListProducts(){
  const productString = localStorage.getItem('products');
  if(productString) {
    this.products = JSON.parse(productString);
  }
}

  ngOnInit(): void {
    this.getListProducts()
  }

}
