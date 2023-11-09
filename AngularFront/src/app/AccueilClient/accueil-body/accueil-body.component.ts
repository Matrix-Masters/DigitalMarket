import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';

@Component({
  selector: 'app-accueil-body',
  templateUrl: './accueil-body.component.html',
  styleUrls: ['./accueil-body.component.scss']
})
export class AccueilBodyComponent implements OnInit {
  categoryId:any;
  constructor(private CategoryService : CategoryServiceService,private route : ActivatedRoute,private ProductService:ProductServiceService){}
  category:any
  products:any
  count_page:any
  page=0
  per_page=4
  search=""
  min=1
  max=0
  maxPrice=0


  getCategoryById(){
   this.CategoryService.getCategorieById(this.categoryId).subscribe((res:any)=>{
  this.category = res.nom;
   })
  }

  getMaxPrix(){
    this.ProductService.getMAxPrice().subscribe((res:any)=>{
      this.maxPrice=res
      this.max=this.maxPrice;
      console.log(this.max);

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


  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.categoryId= params['id'];
    })
    this.getCategoryById();
    this.getProductsByCategoryId();
    this.getMaxPrix();

  }


}
