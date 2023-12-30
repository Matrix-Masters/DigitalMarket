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

  getProductById(id:any){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/GetDetailsProd?id=${id}`);
  }

  ChangerQuantiteProduct(id:any,qte:any):Observable<String>{
      return this.http.put(`${port}/PRODUCT-SERVICE/products/ChangerQuantiteProduct?id=${id}&qte=${qte}`,{}) as Observable<String>;
  }

  GenerateCodeQr(commande:any){
      return this.http.put(`${port}/PRODUCT-SERVICE/codeQr/GenerateCodeQr`,commande);
  }

  getProductsByIdUser(id:any){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/getProductsByIdUser?id=${id}`);
  }
  
  IncrementNbSales(id:any){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/IncrementNbSales?id=${id}`,{});
  }

  AllProduct(page:number,pageSize:number,search:string){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/AllProduct?page=${page}&per_page=${pageSize}${search!='' ? `&search=${search}` : ''}`);
  }

  ImageProducts(id:number){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/ImageProducts?id=${id}`);
  }

  AddImages(image:any,id:number){
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(`${port}/PRODUCT-SERVICE/products/AddImages?idProduct=${id}`,formData);
  } 

  ChangerPriorite(id1:number,id2:number,id:number){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/ChangerPriorite?idProd1=${id1}&idProd2=${id2}&id=${id}`,{});
  }

  DeleteImage(id:number){
    return this.http.delete(`${port}/PRODUCT-SERVICE/products/DeleteImage?id=${id}`);
  }

  IncrementQteProd(id:number,qte:number){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/IncrementQteProd?id=${id}&qte=${qte}`,{});
  }
  
}
