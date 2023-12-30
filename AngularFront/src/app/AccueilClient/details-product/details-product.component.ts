import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Service/product-service.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent {

  Images: any[] = [];
  product: any;

  constructor(private ProductServiceService:ProductServiceService,private ActivatedRoute:ActivatedRoute) {
    this.ActivatedRoute.params.subscribe(params=>{
       this.getProduct(params['id']);
    })
  }


  getProduct(id:any){
    this.ProductServiceService.ImageProducts(id).subscribe((data:any)=>{
      console.log(data);
      for(let i=0;i< data['data'].length;i++){
        this.Images.push(
          {
            "image": data['data'][i]["imageProduct"]
          }
        );
          this.product=[
            {
              "Category": data['data'][0]["product"]["category"]["nom"],
              "name": data['data'][0]["product"]["name"],
              "prix": data['data'][0]["product"]["prix"],
              "quantite": data['data'][0]["product"]["quantite"],
              "description":data['data'][0]["product"]["description"],
            }
          ]
      }
    })
  }

}
