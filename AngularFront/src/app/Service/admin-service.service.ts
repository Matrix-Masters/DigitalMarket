import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient){
  }

  getCategory(){
    return this.http.get(`${port}/PRODUCT-SERVICE/categories/getCatg`);
  }

  getProducts(){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/AllProduct`);
  }
}
