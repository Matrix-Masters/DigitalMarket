import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService{
  constructor(private http:HttpClient){
  }

  getAllCategories() {
    return this.http.get(`${port}/PRODUCT-SERVICE/categories/getAll`);
  }
}
