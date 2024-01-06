import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  constructor(private http:HttpClient) { }

  getAllReviews(){
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/Commande/getReviews`);
  }

  getProductsReview(id:any){
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/Commande/getProductsReviews?id=${id}`);
  }

  addReview(review:any){
    return this.http.post(`${port}/GESTIONCOMMANDE-SERVICE/Commande/addReview`,review);
  }
}
export interface review{
  content:any,
  note:any,
  product_id:any,
  user_id:any
}
