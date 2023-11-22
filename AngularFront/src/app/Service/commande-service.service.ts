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

  ChangerLocationLivreur(Location:any,num:any){
    return this.http.put(`${port}/GESTIONCOMMANDE-SERVICE/Commande/ChangerLocationLivreur/${num}`,Location);
  }
  getCommandeByIdClient(id:any,page:any,limit:any){
  return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/Commande/getCommandesByClient?Client_id=${id}&page=${page}&size=${limit}`)
  }
  deleteCommandeById(id:any){
  return this.http.delete(`${port}/GESTIONCOMMANDE-SERVICE/Commande/deleteCommande?id=${id}`)
  }

}
