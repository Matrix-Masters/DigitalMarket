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

  getCommandeByUser(userId:any){
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/Commande/GetCommandeByIdUser/${userId}`)
  }

  GetLivraisonByNumCommande(NumCommande:any){
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/Commande/GetLivraisonByNumCommande/${NumCommande}`)
  }

}
