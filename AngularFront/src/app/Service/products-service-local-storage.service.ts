import { Injectable } from '@angular/core';
import { Product } from "../Model/Product";
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceLocalStorageService {
  private STORAGE_KEY = 'products';
  constructor() { }
  private productList: Product[] = [];

  addProduct(product: Product): void {
    const productExist = this.productList.find((p:Product)=>p.id === product.id);
    if(productExist){
      productExist.quantity +=1;
    }else{
      const newProduct = new Product();
      newProduct.id = product.id;
      newProduct.name = product.name;
      newProduct.prix = product.prix;
      newProduct.desc = product.desc;
      newProduct.quantity = 1;
      newProduct.status=product.status;
      newProduct.imageSrc = product.imageSrc;
      this.productList.push(newProduct);
    }
    this.saveProductList();
  }



  deleteProduct(product: Product): void {
    const list = localStorage.getItem(this.STORAGE_KEY);
    if (list) {
      let productList: Product[] = JSON.parse(list);
      const index = productList.findIndex((p: Product) => p.id === product.id);
      if (index >= 0) {
        productList.splice(index, 1);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productList));
      }

    }
  }


  updateQte(product: Product){
    const list = localStorage.getItem(this.STORAGE_KEY);
    if (list) {
      const productList: Product[] = JSON.parse(list);
      for(let i=0;i<productList.length;i++){
        if(productList[i].id==product.id){
          productList[i].quantity=product.quantity;
        }
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productList));
    }else{
      console.log("failed");

    }

  }

  clearProductList(): void {
    this.productList = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private saveProductList(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.productList));
  }

}
