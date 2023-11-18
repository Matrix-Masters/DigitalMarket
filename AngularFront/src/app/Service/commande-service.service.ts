import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

  constructor(private http:HttpClient) { }

  AddCommande(data:any){
    return this.http.post(`${port}/GESTIONCOMMANDE-SERVICE/Commande/AddCommande`,data);
  }
  DetailsProd(id:number){
    return this.http.get(`${port}/PRODUCT-SERVICE/products/GetDetailsProd?id=`+id);
  }
  getCommandes(page: number, size: number, search: string)
  {
    
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/commande/GetCommandsWaiting?page=${page}&size=${size}&${search!='' ? 'search='+search : ''}`);
  }


}

