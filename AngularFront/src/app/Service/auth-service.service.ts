import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
import { Store } from '@ngxs/store';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAuth:boolean=true;

  constructor(private http:HttpClient,private Store:Store,){
    this.isAuth=this.Store.selectSnapshot(s=>s.AuthStore?.User);
  }
  
  AdddUser(user:any){
      return this.http.post(`${port}/INFOUSER-SERVICE/users/addUserInfo`,user);
  }

}
