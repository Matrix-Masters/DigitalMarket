import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
}
