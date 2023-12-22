import { Component,OnInit } from '@angular/core';
import {CdkDragDrop ,moveItemInArray} from '@angular/cdk/drag-drop';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.scss']
})
export class ImageProductComponent implements OnInit {

  constructor(private ProductServiceService:ProductServiceService,private ActivatedRoute:ActivatedRoute) { 
    
  }

  id:any;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params:any)=>{
      this.id=params.id;
      this.getImages(params.id);
    });
  }

  getImages(id:any){
    this.ProductServiceService.ImageProducts(id).subscribe((data:any)=>{
      this.products=data.data;
     });
  }

  products:any;
  
  AddImage(){
    this.ProductServiceService.AddImages(this.image,this.id).subscribe((data:any)=>{
      this.getImages(this.id);
    })
  }

  image:any
  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.image=file
  }

  drop(event: CdkDragDrop<string[]>) {
    this.ProductServiceService.ChangerPriorite(this.products[event.previousIndex].id,this.products[event.currentIndex].id).subscribe((data:any)=>{
       this.getImages(this.id);
    })
  }
 

}
