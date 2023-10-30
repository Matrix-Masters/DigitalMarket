import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/Service/category-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public categoriesService : CategoryServiceService){}
  categories:any;
  images = [
    {
      imageSrc:
        '../../../assets/ecommerce.jpg',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
      '../../../assets/livraison.jpg',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        '../../../assets/sales.jpg',
      imageAlt: 'person2',
    },
  ]

  ngOnInit():void {

  }
}
