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
    return this.http.get(`${port}/PRODUCT-SERVICE/products/getProductsNewArrivals`);
  }
  getProductsByCategoryId(id:any,page:number,pageSize:number,search:String,prix:number){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/ProductsByIdCategoriePaginate?id=${id}&page=${page}&per_page=${pageSize}&search=${search}&prix=${prix}`);
  }

  getMAxPrice(){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/getMaxPrice`);
  }
}
