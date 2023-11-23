import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';


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


  constructor(public AuthServiceService:AuthServiceService, public categoriesService : CategoryServiceService){}



  getListProducts(){
    const productString = localStorage.getItem('products');
    if(productString) {
      this.products = JSON.parse(productString);
    }
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
