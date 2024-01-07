import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { port } from 'src/env';
import { Contract } from '../Model/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  constructor(private http:HttpClient) { }


  AddConract(file:any,nameContract:any,DoneWorkDate:any,product:any,idUser:any){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nameContract', nameContract);
    formData.append('DoneWorkDate', DoneWorkDate);
    formData.append('products', product);
    formData.append('idUser', idUser);
    return this.http.post(`${port}/INFOUSER-SERVICE/contract`,formData);

}

}
