import { Component,OnInit } from '@angular/core';

import L  from 'leaflet';

import 'leaflet';
import 'leaflet-routing-machine';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.scss']
})
export class CommandeClientComponent  implements OnInit  {

  constructor(private CommandeServiceService:CommandeServiceService){
  }

  map :any;
  InitMap(){
      if (this.map) {
        this.map.remove();
      }
        this.map = L.map('map',{
            zoom: 13
        }).setView([this.LocationForClient.lat,this.LocationForClient.log], 13);
 
      var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      openstreetmap.addTo(this.map);

      var googleSreet=L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(this.map);
    
     var baseMaps = {
      "Google Street": googleSreet,
      "OpenStreetMap": openstreetmap,
     }
  
     L.control.layers(baseMaps).addTo(this.map);

     var marker1=L.marker([this.LivreurLocation.lat,this.LivreurLocation.log], {
      icon: L.icon({ iconUrl: '../../../assets/Develery.gif', iconSize: [100, 100] }),
      zIndexOffset: 1000  
    })
    .addTo(this.map);
    
   L.marker([this.LocationForClient.lat,this.LocationForClient.log], {
      icon: L.icon({ iconUrl: '../../../assets/location.svg', iconSize: [30, 40] }),
      zIndexOffset: 1000 
    })
    .addTo(this.map)
    .bindPopup('Your Location Talel')
    .openPopup();

     L.Routing.control({
      waypoints: [
        L.latLng(this.LivreurLocation.lat,this.LivreurLocation.log),
        L.latLng(this.LocationForClient.lat,this.LocationForClient.log)
      ],
      lineOptions:{
        extendToWaypoints: true,
        styles:[
          {
            color:"blue",
            weight:4,
            opacity:0.7
          }
        ],
        missingRouteTolerance: 100
     },
      routeWhileDragging: false,
      showAlternatives:false,
      fitSelectedRoutes:true,
      addWaypoints:false,
    }).on("routesfound",function(e){
      e.routes[0].coordinates.forEach((c:any,i:any)=>{
        setTimeout(()=>{
          marker1.setLatLng([
            c.lat,c.lng
          ]);
        },1000*i);
      })
    })
    .addTo(this.map);
 
  }

  SelectCommande:any=null;
  Listcommandes:any;
  LocationForClient={
    lat:0,
    log:0
  }

  LivreurLocation={
    lat:0,
    log:0
  }

  getCommandes(){
    this.CommandeServiceService.getCommandeByUser(1).subscribe((res:any)=>{
       this.Listcommandes=res;
    })
  }

  choseCommande(data:any){
    this.SelectCommande=null;
    this.LocationForClient.lat=0;
    this.LocationForClient.log=0;
    this.SelectCommande=data
    this.LocationForClient.lat=this.SelectCommande.location.latitude;
    this.LocationForClient.log=this.SelectCommande.location.longitude;
    this.GetLocationForLivreaurr();
  }

  GetLocationForLivreaurr(){
    this.CommandeServiceService.GetLivraisonByNumCommande(this.SelectCommande.NumCommande).subscribe((res:any)=>{
        this.LivreurLocation.lat=res.Location.latitude;
        this.LivreurLocation.log=res.Location.longitude;
        this.InitMap();
    })
  }

  ngOnInit(): void {
    this.getCommandes();
  }
  
}
