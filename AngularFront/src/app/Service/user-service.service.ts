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
    return this.http.post(`${port}/INFOUSER-SERVICE/updateUser?id=${id}`,user);
  }

  getUserById(id:any){
    return this.http.get(`${port}/INFOUSER-SERVICE/getUserById?id=${id}`);
  }
}
