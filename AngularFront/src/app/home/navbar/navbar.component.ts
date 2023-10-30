import { Component, Input, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/Service/category-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories:any;
  constructor(public categoriesService : CategoryServiceService){}

  ngOnInit():void {
    this.categoriesService.getAllCategories().subscribe(
      res=>{
        console.log(res);
        this.categories=res;
      },
      err=>{
        console.log(err);

      }
    )
  }

}
