import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceService } from 'src/app/Service/category-service.service';

@Component({
  selector: 'app-accueil-body',
  templateUrl: './accueil-body.component.html',
  styleUrls: ['./accueil-body.component.scss']
})
export class AccueilBodyComponent implements OnInit {
  categoryId:any;
  constructor(private CategoryService : CategoryServiceService,private route : ActivatedRoute){}
  category:any

  getCategoryById(){
   this.CategoryService.getCategorieById(this.categoryId).subscribe((res:any)=>{
    console.log(res);
   })
  }
  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.categoryId= Number(params['id']);
    })
    console.log(typeof(this.categoryId));

    this.getCategoryById();
  }


}
