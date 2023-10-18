import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';

import {
  CdkDragDrop,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-classer-product',
  templateUrl: './classer-product.component.html',
  styleUrls: ['./classer-product.component.scss'],
})
export class ClasserProductComponent implements OnInit {
  constructor(private AdminServiceService: AdminServiceService) {}

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      var idproduct=this.Products[event.previousIndex].id;
      var idcat = event.container.data[event.currentIndex].id;
      console.log("idcat "+idcat + "  "+"idprod "+idproduct);
    } else {
      var idproduct=this.Products[event.previousIndex].id;
      var idcat= event.container.data[event.currentIndex].id;
      console.log("idcat "+idcat + "  "+"idprod "+idproduct);
    }
  }

  Categories:any;
  Products:any;

  ngOnInit(): void {
    this.GetCatg();
    this.ProductsWithoutCategory();
  }

  GetCatg() {
    this.AdminServiceService.getCategory().subscribe((res: any) => {
      this.Categories = res;
      this.Categories.forEach((element: any) => {
        this.AdminServiceService.ProductsByIdCategorie(element.id).subscribe((products: any) => {
          element.Products = products;
        });
      });
    });
  }

  ProductsWithoutCategory() {
    this.AdminServiceService.ProductsWithoutCategory().subscribe((res: any) => {
      this.Products = res;
    });
  }
}
