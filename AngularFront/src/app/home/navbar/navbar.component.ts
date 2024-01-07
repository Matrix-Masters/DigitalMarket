import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { User } from 'src/app/Model/User_Store';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { Logout } from 'src/app/Store/state';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories:any;
  id:any
  products:any
  nbrArticle:number=0
  user:User;
  constructor(
      private Router:Router,
      private store:Store,
      private keycloakService: KeycloakService,
      public AuthServiceService:AuthServiceService, 
      public categoriesService : CategoryServiceService){
    this.user=this.store.selectSnapshot(s=>s.AuthStore?.User)
  }


  Logout(){
    this.keycloakService.logout();
    this.store.dispatch([
      new Logout()
    ]);
    this.Router.navigate(['']);
  }
  
  getListProducts(){
    const productString = localStorage.getItem('products');
    if(productString) {
      this.products = JSON.parse(productString);
    }
  }
  Login(){
    this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }
  
  signup(){
    this.keycloakService.register({
      redirectUri: window.location.origin + "/auth/signup"
    });
  }

  ngOnInit():void {
    this.categoriesService.getAllCategories().subscribe(
      (res:any)=>{
        this.categories=res;
      },
      err=>{
        console.log(err);
      }
    )

    this.getListProducts()
    for(let i = 0; i < this.products?.length; i++){
      this.nbrArticle = (this.products.length)
    }

  }




}
