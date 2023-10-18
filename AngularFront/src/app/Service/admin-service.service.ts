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

  ProductsWithoutCategory(){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/ProductsWithoutCategory`);
  }

  ProductsByIdCategorie(id:number){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/ProductsByIdCategorie?id=`+id);
  }

  UpdateIdProducts(id:number,cat:any){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/UpdateIdProducts?id=${id}`,cat);
  }
}
