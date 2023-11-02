import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/Service/category-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories:any;
  id:any
  @Output() dataEvent = new EventEmitter<Number>();

  passId() {
    this.getIdFromUrl();
    const data = 'Data from the child component';
    this.dataEvent.emit(this.id);
  }
  constructor(public categoriesService : CategoryServiceService,private route: ActivatedRoute){}

getIdFromUrl(){
  this.route.params.subscribe((params:any)=>{
    this.id= params['id'];
  })
}
  ngOnInit():void {
    this.categoriesService.getAllCategories().subscribe(
      res=>{
        this.categories=res;
      },
      err=>{
        console.log(err);

      }
    )

  }

}
