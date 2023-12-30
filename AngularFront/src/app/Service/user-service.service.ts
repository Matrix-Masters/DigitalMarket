import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { port } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  updateUser(user: User,id:any) {
    return this.http.post(`${port}/INFOUSER-SERVICE/users/updateUser?id=${id}`,user);
  }

  getUserById(id:any){
    return this.http.get(`${port}/INFOUSER-SERVICE/users/getUserById?id=${id}`);
  }

  SendEmailChanged(email_old:any,email_new:any){
    return this.http.get(`${port}/INFOUSER-SERVICE/users/SendEmailChanged?email_new=${email_new}&email_old=${email_old}`);
  }
}
