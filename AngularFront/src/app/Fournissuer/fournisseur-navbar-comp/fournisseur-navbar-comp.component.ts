import { Component } from '@angular/core';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';

@Component({
  selector: 'app-fournisseur-navbar-comp',
  templateUrl: './fournisseur-navbar-comp.component.html',
  styleUrls: ['./fournisseur-navbar-comp.component.scss']
})

export class FournisseurNavbarCompComponent {

  constructor(private ProductServiceService:ProductServiceService,private CommandeServiceService:CommandeServiceService ) { }

  PropreProducts:any=[];
  wallet:any;

  ngOnInit(): void {
      this.getProduct();
  }

  getProduct(){
    this.ProductServiceService.getProductsByIdUser(3).subscribe((res:any)=>{
      this.PropreProducts=res;
      this.getTotalPrix(this.PropreProducts);
    })
  }

  getTotalPrix(prod:any){
    this.CommandeServiceService.CalculerWalletSupplier({
      "Products":prod,
    }).subscribe((res:any)=>{
       this.wallet=res.wallet;
       console.log(this.wallet);
    })
  }

}
