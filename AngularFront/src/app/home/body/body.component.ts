import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/Service/product-service.service';

interface carouselImage{
  imageSrc: string;
  imageAlt: string;
}
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent  implements OnInit {
  products:any;
  productsRecommandations:any
  constructor(public productService : ProductServiceService){}
  @Input() images : carouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  selectedIndex=0;
  id:any=21
  ngOnInit(): void {
    this.getProductNewArrivals();
    this.getRecommandations();
  }



  selectImage(index : number) : void{
    this.selectedIndex = index;
  }

  onPrevClick() : void{
    if(this.selectedIndex ===0){
      this.selectedIndex = this.images.length - 1 ;
    }else{
      this.selectedIndex--;
    }
  }

  onNextClick() : void{
    if(this.selectedIndex ===this.images.length - 1){
      this.selectedIndex = 0 ;
    }else{
      this.selectedIndex++;
    }
  }

  getProductNewArrivals(){
    this.productService.getProductNewArrivals().subscribe(
      res=>{
        this.products=res;
      },
      err=>{
        console.log(err);

      }
    )
  }

  getRecommandations(){
    this.productService.getRecommandations(this.id).subscribe(
      res=>{
        this.productsRecommandations=res;
        console.log(this.productsRecommandations);
      },
      err=>{
        console.log(err);

      }
    )
  }

}
