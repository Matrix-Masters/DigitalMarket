import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { Logout } from 'src/app/Store/state';

@Component({
  selector: 'app-fournisseur-navbar-comp',
  templateUrl: './fournisseur-navbar-comp.component.html',
  styleUrls: ['./fournisseur-navbar-comp.component.scss']
})

export class FournisseurNavbarCompComponent {

  constructor(private Router:Router,private KeycloakSrvice:KeycloakService, private Store:Store, private ProductServiceService:ProductServiceService,private CommandeServiceService:CommandeServiceService ) {
     this.user=this.Store.selectSnapshot(s=>s.AuthStore?.User)
   }

  PropreProducts:any=[];
  wallet:any=0;
  user:any;

  ngOnInit(): void {
      this.getProduct();
  }

  getProduct(){
    this.ProductServiceService.getProductsByIdUser(this?.user['iduser']).subscribe((res:any)=>{
      this.PropreProducts=res;
      this.getTotalPrix(this.PropreProducts);
    })
  }

  logout(){
    this.KeycloakSrvice.logout();
    this.Store.dispatch([
      new Logout()
    ]);
    this.Router.navigate(['/']);
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
