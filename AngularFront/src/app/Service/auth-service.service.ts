import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient){
  }
  
  AdddUser(user:any){
      return this.http.post(`${port}/INFOUSER-SERVICE/addUserInfo`,user);
  }

}
