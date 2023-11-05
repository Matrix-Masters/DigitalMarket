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

  LibererProduct(id:number){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/LibererProduct?id=${id}`,{});
  }

  GetAcceptedProducts(page: number, pageSize: number) {
    return this.http.get(`${port}/PRODUCT-SERVICE/products/AllProduct?page=${page}&per_page=${pageSize}`);
  }

  GetRefusedProducts(page: number, pageSize: number) {
    return this.http.get(`${port}/PRODUCT-SERVICE/products/RefusedProducts?page=${page}&per_page=${pageSize}`);
  }

  GetPendingProducts(page: number, pageSize: number) {
    return this.http.get(`${port}/PRODUCT-SERVICE/products/PendingProduct?page=${page}&per_page=${pageSize}`);
  }
  AcceptProduit(id: number) {
    return this.http.put(`${port}/PRODUCT-SERVICE/products/AcceptProduct?id=${id}`, {});
  }
  RefuseProduct(id:number){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/RefuseProduct?id=${id}`, {});
  }
  PendingProducts(id:number){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/PendingProducts?id=${id}`, {});
  }

  RejectProduct(id:number){
    return this.http.put(`${port}/PRODUCT-SERVICE/products/RejectProduct?id=${id}`,{});
  }

  getAllSuppliers(){
    return this.http.get(`${port}/INFOUSER-SERVICE/GererSupplier/suppliers`);
  }
  getSuppliersFilter(search:string,status:number,Date:any){
    return this.http.get(`${port}/INFOUSER-SERVICE/GererSupplier/filter?search=${search}&status=${status}&date_enter=${Date}`)
  }
  AcceptSupplier(id:number){
    return this.http.put(`${port}/INFOUSER-SERVICE/GererSupplier/AcceptSupplier?id=${id}`,{})
  }
  RefuseSiupplier(id:number){
    return this.http.put(`${port}/INFOUSER-SERVICE/GererSupplier/RefuseSupplier?id=${id}`,{})
  }

  AddCategory(CategData : object){
    return this.http.post(`${port}/PRODUCT-SERVICE/categories/AddCat`,CategData);

  }
  destroyCategory(id: any) {
    return this.http.delete(`${port}/PRODUCT-SERVICE/categories/DeleteCategoryById?id=${id}`);
  }
  
updateCategory(CategoryId: any, Category:CategoryResponse) {
  const url = `${port}/PRODUCT-SERVICE/categories/updateCategorie?id=${CategoryId}`;
  return this.http.post(url, Category);
}

}
export interface CategoryResponse {
  nom: any
  image: any
  id:any
}

