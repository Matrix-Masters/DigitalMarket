import { Component ,OnInit,Output,EventEmitter} from '@angular/core';
import L  from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import { LocationClientService } from 'src/app/Service/location-client.service';



@Component({
  selector: 'app-location-commande',
  templateUrl: './location-commande.component.html',
  styleUrls: ['./location-commande.component.scss']
})
export class LocationCommandeComponent implements OnInit  {

  constructor(private LocationClientService:LocationClientService) {
  }

//   InitMap(){
//     navigator.geolocation.getCurrentPosition((position) => {
//       var map = L.map('map',{
//         zoom: 13
//       }).setView([position.coords.latitude,position.coords.longitude], 13);

//         L.marker([position.coords.latitude,position.coords.longitude],
//         { icon: L.icon({	iconUrl: '../../../assets/Develery.gif',  iconSize: [100, 100],}) }
//         )
//         .addTo(map)

//       var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       });
//       openstreetmap.addTo(map);

//       var googleSreet=L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
//         maxZoom: 20,
//         subdomains:['mt0','mt1','mt2','mt3']
//       }).addTo(map);
    

//      var baseMaps = {
//       "Google Street": googleSreet,
//       "OpenStreetMap": openstreetmap,
//      }
  

//      L.control.layers(baseMaps).addTo(map);

//      L.Routing.control({
//       waypoints: [
//         L.latLng(position.coords.latitude,position.coords.longitude),
//         L.latLng((position.coords.latitude)+0.01,(position.coords.longitude)+0.01)
//       ],
//       lineOptions:{
//         extendToWaypoints: true,
//         styles:[
//           {
//             color:"blue",
//             weight:4,
//             opacity:0.7
//           }
//         ],
//            missingRouteTolerance: 100
//      },
//       routeWhileDragging: false,
//       showAlternatives:true,
//       fitSelectedRoutes:true,
//       addWaypoints:false,
//     }).addTo(map);
      
//   })

// }

private map: any; 
private marker: any;

@Output() CurrentLocation=new EventEmitter()

InitMap(){
  navigator.geolocation.getCurrentPosition((position) => {
      this.map = L.map('map',{
        zoom: 13
      }).setView([position.coords.latitude,position.coords.longitude], 13);
      this.marker = L.marker([position.coords.latitude,position.coords.longitude], {
        icon: L.icon({
          iconUrl: '../../../assets/location.svg',
          iconSize: [20, 30],
        })
      }).addTo(this.map);
      
      this.LocationClientService.getLocate(position.coords.latitude, position.coords.longitude).subscribe((res:any) => {
        this.CurrentLocation.emit({ lat: position.coords.latitude, lng: position.coords.longitude , name:res.results[0].formatted});
         var popup = L.popup();
          popup
            .setContent(
                "Address : "+res.results[0].formatted)
            .openOn(this.map);
          });

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

     this.map.on('click', (e:any) => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], {
        icon: L.icon({
          iconUrl: '../../../assets/location.svg',
          iconSize: [20, 30],
        })
      }).addTo(this.map);

      //Get Locate :) Formatted

      this.LocationClientService.getLocate(e.latlng.lat, e.latlng.lng).subscribe((res:any) => {
      this.CurrentLocation.emit({ lat: e.latlng.lat, lng: e.latlng.lng , name:res.results[0].formatted});
       var popup = L.popup();
        popup
          .setLatLng(e.latlng)
          .setContent(
              "Address : "+res.results[0].formatted)
          .openOn(this.map);
        });
      });
  });
  }
  
  ngOnInit(): void {
    this.InitMap();
  }
  
}



