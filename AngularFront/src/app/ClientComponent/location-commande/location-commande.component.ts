import { Component ,OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-location-commande',
  templateUrl: './location-commande.component.html',
  styleUrls: ['./location-commande.component.scss']
})
export class LocationCommandeComponent implements OnInit  {

  private map:any;

  constructor(){
    this.map = L.Map;
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }


  ngOnInit(): void {
    this.initMap();
  }
   
}
