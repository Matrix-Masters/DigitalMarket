import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  categories : any[] = ['SkinCare', 'Make up','Haire care','bath & body','Beauti supplements','Promos'];
  

}
