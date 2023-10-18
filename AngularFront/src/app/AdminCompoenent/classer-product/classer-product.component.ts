import { Component,OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-classer-product',
  templateUrl: './classer-product.component.html',
  styleUrls: ['./classer-product.component.scss']
})
export class ClasserProductComponent implements OnInit {

  constructor(private AdminServiceService:AdminServiceService){}


  dropProductInCategory(event: CdkDragDrop<string[]>, category: any) {
    console.log('dropProductInCategory called');
    // Récupérez les coordonnées du point de largage
    const dropPoint = event.distance;

    // Parcourez les catégories
    for (const cat of this.Categories) {
        // Récupérez le rectangle de la zone de largage de la catégorie
        const dropListElement: Element = category.element.nativeElement;
        const rect = dropListElement.getBoundingClientRect();

        // Vérifiez si le point de largage se trouve à l'intérieur de la zone de largage
        if (
            dropPoint.x >= rect.left &&
            dropPoint.x <= rect.right &&
            dropPoint.y >= rect.top &&
            dropPoint.y <= rect.bottom
        ) {
            // Le point de largage est à l'intérieur de cette catégorie
            console.log('Dropped in category with idCategory:', cat.idCategory);
            break;
        }
    }
}

  // Define the dropProduct method to handle product drops in the product list
  dropProduct(event: CdkDragDrop<string[]>) {
    console.log("1");
    if (event.previousContainer !== event.container) {
      // Transfer the item from a category to the product list
      const movedProduct = event.item.data;
      this.Products.splice(event.currentIndex, 0, movedProduct);
    }
  }

  Categories:any;
  Products:any;
  ngOnInit(): void {
    this.GetCatg();
    this.getProducts();
  }

  GetCatg(){
    this.AdminServiceService.getCategory().subscribe((res:any)=>{
        this.Categories=res;
    })
  }
  getProducts(){
    this.AdminServiceService.getProducts().subscribe((res:any)=>{
      this.Products=res;
    })
  }
  
}
