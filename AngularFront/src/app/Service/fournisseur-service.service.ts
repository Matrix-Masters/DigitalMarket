import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { port } from 'src/env';

@Injectable({
  providedIn: 'root'
})

export class FournisseurServiceService {
  constructor(private http:HttpClient) { }

  getProductFournisseur(id:any,page:number,pageSize:number,search:string,status:number){
     return this.http.get(`${port}/PRODUCT-SERVICE/products/GetProductsFournisseur?id=${id}&page=${page}&per_page=${pageSize}&search=${search}&status=${status}`);
  }

}
