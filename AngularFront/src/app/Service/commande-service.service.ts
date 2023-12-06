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
  getCommandes(page: number, size: number, search: string,data:string)
  {
    
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/commande/GetCommandsWaiting?page=${page}&size=${size}&${search!='' ? 'search='+search : ''}&type=${data}`);
  }

  AcceptCommand(num:number,data:any){
    return this.http.put(`${port}/GESTIONCOMMANDE-SERVICE/commande/AcceptCommand/${num}`,data);
  }

  RefusedCommand(num:number,data:any){
    return this.http.put(`${port}/GESTIONCOMMANDE-SERVICE/commande/RefusedCommand/${num}`,data);
  }

  getNotificationsByIdRecu(idRecu: any) {
    return this.http.get(`${port}/FEEDBACK-SERVICE/FeedBack/getNotificationsByIdRecu/${idRecu}`);
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

  CalculerWalletSupplier(tab:any){
      console.log(tab);
      return this.http.post(`${port}/GESTIONCOMMANDE-SERVICE/Commande/CalculerWalletSupplier`,tab);
  }

}

