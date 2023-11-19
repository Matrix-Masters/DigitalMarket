import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  addToWishlist(data:any)
  {
    return this.http.post(`${port}/FEEDBACK-SERVICE/FeedBack/addToWishlist`,data);
  }
  showList(id:number)
  {
    return this.http.get(`${port}/FEEDBACK-SERVICE/FeedBack/showList?id=`+id);
  }

  
  

}
