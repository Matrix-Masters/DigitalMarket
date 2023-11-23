import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';

@Component({
  selector: 'app-accueil-body',
  templateUrl: './accueil-body.component.html',
  styleUrls: ['./accueil-body.component.scss']
})
export class AccueilBodyComponent implements OnInit {
  categories:any;
  categoryId:any;
  constructor(public AuthServiceService:AuthServiceService,private router: Router,private CategoryService : CategoryServiceService,private route : ActivatedRoute,private ProductService:ProductServiceService){}
  category:any
  products:any
  productSt:any
  count_page:any
  page=0
  per_page=4
  search=""
  min=1
  max=0
  maxPrice=0
  nbrArticle:number=0

  getListProducts(){
    const productString = localStorage.getItem('products');
    if(productString) {
      this.productSt = JSON.parse(productString);
    }
  }
  refreshPage(id:any): void {
    const currentUrl = this.router.url;
    this.categoryId=id;
      console.log(this.categoryId);
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/categories/'+id]).then(() => {
          this.getProductsByCategoryId();
        });
      });
    }, 100);

  }

  getCategoryById(){
   this.CategoryService.getCategorieById(this.categoryId).subscribe((res:any)=>{
  this.category = res.nom;
   })
  }

  getMaxPrix(){
    this.ProductService.getMAxPrice().subscribe((res:any)=>{
      this.maxPrice=res
      this.max=this.maxPrice;
    })
  }

  getProductsByCategoryId(){
    this.ProductService.getProductsByCategoryId(this.categoryId,this.page,this.per_page,this.search,this.min,this.max).subscribe((res:any)=>{
      this.products=res.product.content;
      this.count_page = res.count_page.length
    })
  }

  nextPage(){
    if(this.page<this.products.length-1){
      this.page++;
      this.getProductsByCategoryId()
    }
  }

  previousPage(){
    if(this.page>0){
      this.page--;
      this.getProductsByCategoryId()
    }
  }

clearInputs(){
  this.search=""
  this.min=1
  this.max=this.maxPrice
  this.getProductsByCategoryId()
}

getProducts(){

}

  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.categoryId= params['id'];
    })
    this.getCategoryById();
    this.getProductsByCategoryId();
    this.getMaxPrix();
    this.CategoryService.getAllCategories().subscribe(
      (res:any)=>{
        this.categories=res;
      },
      err=>{
        console.log(err);
      }
    )
    this.getListProducts()
    for(let i = 0; i < this.productSt?.length; i++){
      this.nbrArticle = (this.productSt.length)
    }

  }


}
