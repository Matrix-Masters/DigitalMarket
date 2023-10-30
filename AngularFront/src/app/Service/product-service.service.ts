import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService{
  constructor(private http:HttpClient){
  }
  getProductNewArrivals(){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/getProductsNewArrivals`)
  }
}
