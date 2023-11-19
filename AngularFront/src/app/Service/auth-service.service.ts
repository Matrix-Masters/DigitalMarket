import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAuth:Boolean=false;
  constructor(private http:HttpClient){
     localStorage.setItem("token","dsqd");
     this.isAuth=localStorage.getItem("token") ? true : false;
  }
  
  AdddUser(user:any){
      return this.http.post(`${port}/INFOUSER-SERVICE/addUserInfo`,user);
  }

}
