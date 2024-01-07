import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class LocationClientService {

  constructor(private http:HttpClient){
  }

   getLocate(lat:any,lng:any) {
    return this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat},+${lng}&key=04367a3c4da04bfebea0f1548634524a&language=fr&pretty=1`);
   }
  
}
