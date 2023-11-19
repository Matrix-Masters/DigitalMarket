import { Component } from '@angular/core';

@Component({
  selector: 'app-gerer-commande',
  templateUrl: './gerer-commande.component.html',
  styleUrls: ['./gerer-commande.component.scss']
})
export class GererCommandeComponent {


  isPopupOpen: boolean = false;
  openPopup() {
    this.isPopupOpen = true;
    console.log("works")
  }

  
  closePopup() {
    this.isPopupOpen = false;
    console.log("closed")
  }
}
