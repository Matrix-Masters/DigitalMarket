import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  categories:any;
  id:any




  constructor(public AuthServiceService:AuthServiceService, public categoriesService : CategoryServiceService,private route: ActivatedRoute , private router: Router){}



  ngOnInit():void {
    this.categoriesService.getAllCategories().subscribe(
      (res:any)=>{
        this.categories=res;
      },
      err=>{
        console.log(err);
      }
    )
  }
}
