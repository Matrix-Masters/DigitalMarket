import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { User } from 'src/app/Model/User_Store';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  categories:any;
  id:any
  products:any
  nbrArticle:number=0
  user:User;


  constructor(  private store:Store,public AuthServiceService:AuthServiceService, public categoriesService : CategoryServiceService,private route: ActivatedRoute , private router: Router,private productStorage:ProductsServiceLocalStorageService){
    this.user=this.store.selectSnapshot(s=>s.AuthStore?.User)
  }

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
