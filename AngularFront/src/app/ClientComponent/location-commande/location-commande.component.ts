import { Component ,OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-location-commande',
  templateUrl: './location-commande.component.html',
  styleUrls: ['./location-commande.component.scss']
})
export class LocationCommandeComponent implements OnInit  {

  // private map:any;

  // constructor(){
  //   this.map = L.Map;
  // }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [ 39.8282, -98.5795 ],
  //     zoom: 3
  //   });

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 3,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  //   tiles.addTo(this.map);
  // }


  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
    var map = L.map('map',{
      zoom: 13
    }).setView([position.coords.latitude,position.coords.longitude], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


 L.marker([position.coords.latitude,position.coords.longitude], { icon: L.icon({	iconUrl: '../../../assets/404-status-code-removebg-preview.png',  iconSize: [38, 95],}) }).addTo(map)
    .bindPopup('Your Position.')
    .openPopup();
  })

}
   
}
