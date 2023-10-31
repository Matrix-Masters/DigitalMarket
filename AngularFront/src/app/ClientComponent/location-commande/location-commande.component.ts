import { Component ,OnInit} from '@angular/core';
import L  from 'leaflet';

import 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-location-commande',
  templateUrl: './location-commande.component.html',
  styleUrls: ['./location-commande.component.scss']
})
export class LocationCommandeComponent implements OnInit  {

  constructor() {
  }

  InitMap(){
    navigator.geolocation.getCurrentPosition((position) => {
      var map = L.map('map',{
        zoom: 13
      }).setView([position.coords.latitude,position.coords.longitude], 13);

        L.marker([position.coords.latitude,position.coords.longitude],
        { icon: L.icon({	iconUrl: '../../../assets/Develery.gif',  iconSize: [100, 100],}) }
        )
        .addTo(map)

      var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      openstreetmap.addTo(map);

      var googleSreet=L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(map);
    

     var baseMaps = {
      "Google Street": googleSreet,
      "OpenStreetMap": openstreetmap,
     }
  

     L.control.layers(baseMaps).addTo(map);

     L.Routing.control({
      waypoints: [
        L.latLng(position.coords.latitude,position.coords.longitude),
        L.latLng((position.coords.latitude)+0.01,(position.coords.longitude)+0.01)
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
      showAlternatives:true,
      fitSelectedRoutes:true,
      addWaypoints:false,
    }).addTo(map);
      
  })

}
  
  ngOnInit(): void {
    this.InitMap();
  }

  
}



