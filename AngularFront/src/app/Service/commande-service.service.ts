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

}
