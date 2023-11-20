import { Component } from '@angular/core';

@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.scss']
})
export class ListCommandesComponent{
  NumCommande: string = "11700";
  Name: string = "Talel";
  Cin: string = "12345678";
  LastName: string = "Mejri";
  email: string = "talel@gmail.com";
  phone: string = "12345678";
  PrixTotal: string = "15.25";
  location: {
    Client_id: string;
    Status: string;
  } = {
    Client_id: "1",
    Status: "Waiting",
  };
  LigneCommandes: {
    Date: string;
  }[] = [
    {
      Date: "2023-11-20T22:00:00.676+00:00",
    }
  ];
  isExpanded: boolean = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  deleteCommande(): void {
    console.log("delete");
  }
}
