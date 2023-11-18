import { Component } from '@angular/core';
import { Product } from 'src/app/Model/Product';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';

@Component({
  selector: 'app-gerer-commande',
  templateUrl: './gerer-commande.component.html',
  styleUrls: ['./gerer-commande.component.scss']
})
export class GererCommandeComponent {

  constructor(private commandeService: CommandeServiceService) {
    this.pagination={
      currentPage:1,
      total:0,
      per_page:5
    }

    this.InfoCommande={
      prixTotal:0,
      ListProducts:[],
      infoUser:[]
    }

  }


  changePage(num:number){
    this.pagination.currentPage=num;
  }
  isPopupOpen: boolean = false;
  openPopup() {
    this.isPopupOpen = true;
    console.log("works")
  }

  
  closePopup() {
    this.isPopupOpen = false;
    console.log("closed")
  }

  pagination:{
    currentPage:number,
    total:number,
    per_page:number
  }

  CommandeId!:any
  paginationPages:number[]=[];
  pageSearch = "";
  commandes: any[] = [];

  ngOnInit()
  {
    this.getCommande();
   }

   LimitPage=[
    2,5,3,10
   ]
 
 private productList: Product[] = [];

 InfoCommande:{
  prixTotal:number,
  ListProducts: {
    image:string,
    id:number,
    name:string,
    qte:number
  }[],
  infoUser:
    { 
      NumCommande: string,
      Name: string,
      Cin:string,
      LastName:string,
      email:string,
      phone:string
    }[]
 }


  getCommande() {
    this.commandeService.getCommandes(this.pagination.currentPage, this.pagination.per_page, this.pageSearch)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.commandes = res.docs;
          this.pagination.currentPage=res.page;
          this.pagination.total=res.pages;
          this.pagination.per_page=res.limit;
          this.paginationPages=Array.from({
            length:this.pagination.total},(_,i)=>i+1);
            console.log(this.paginationPages);
            
        },
        (error) => {
          console.error('Error fetching commands:', error);
        }
      );
  }
  clearInfo(){
    this.InfoCommande.ListProducts=[];
    this.InfoCommande.infoUser=[];
    this.InfoCommande.prixTotal=0;
  }
  showCommandeInfo(command: any) {
    this.clearInfo();
    command.LigneCommandes.forEach((val: any) => {
      var idProduct = val.Product_id;
      this.commandeService.DetailsProd(idProduct).subscribe((res: any) => {
        console.log(res);
        this.InfoCommande.ListProducts.push(
          {
           'image':res.image as string,
           'id':res.id as number,
           'name':res.name as string,
           'qte':val.Quantity as number
          }
        );
    });
  });
  this.InfoCommande.infoUser.push({
    'NumCommande': command.NumCommande as string,
    'Name':command.Name   as string,
    'Cin':command.Cin   as string,
    'LastName':command.LastName   as string,
    'email':command.email   as string,
    'phone':command.phone   as string,
 });
 this.InfoCommande.prixTotal=command.PrixTotal
  console.log(this.InfoCommande);
}

}

