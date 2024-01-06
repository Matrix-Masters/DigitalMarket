import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient){
  }

  getStats(id:any){
    return this.http.get(`${port}/GESTIONCOMMANDE-SERVICE/Commande/getStats/${id}`);
  }

}

