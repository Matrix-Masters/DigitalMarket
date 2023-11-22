import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService{

  constructor(private http:HttpClient){}

  getProductNewArrivals(){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/getProductsNewArrivals`);
  }

  getProductsByCategoryId(id:any,page:number,pageSize:number,search:String,min:number,max:number){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/ProductsByIdCategoriePaginate?id=${id}&page=${page}&per_page=${pageSize}&search=${search}&min=${min}&max=${max}`);
  }

  getMAxPrice(){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/getMaxPrice`);
  }

  addProduct(image:any,name:any,description:any,prix:any,quantite:any){
      const formData = new FormData();
      formData.append('file', image);
      return this.http.post(`${port}/PRODUCT-SERVICE/products/AddProduct?name=${name}&description=${description}&prix=${prix}&quantite=${quantite}`,formData);
  }

  ChangerQuantiteProduct(id:any,qte:any):Observable<String>{
      return this.http.put(`${port}/PRODUCT-SERVICE/products/ChangerQuantiteProduct?id=${id}&qte=${qte}`,{}) as Observable<String>;
  }
  
}
