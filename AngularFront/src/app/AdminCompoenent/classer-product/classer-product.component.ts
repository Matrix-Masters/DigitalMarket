import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {
  CdkDragDrop,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

@Component({
  selector: 'app-classer-product',
  templateUrl: './classer-product.component.html',
  styleUrls: ['./classer-product.component.scss'],
})
export class ClasserProductComponent implements OnInit {
  constructor(private AdminServiceService: AdminServiceService,private _snackBar: MatSnackBar,private dialog:Dialog) {}

  drop(event: CdkDragDrop<any[]>,category?:any): void {
    if (event.previousContainer === event.container) {
     // alert("dgd")
    } else {
        console.log(typeof(this.Products[event.previousIndex].id));
        this.AdminServiceService.UpdateIdProducts(this.Products[event.previousIndex].id,category).subscribe((res:any)=>{
          this.Categories=[];
          this.Products=[];
          this._snackBar.open(`Product ${this.Products[event.previousIndex].name} Classer Au Category ${category.nom}`, 'Undo', {
            duration: 3000
          });
          this.GetCatg();
          this.ProductsWithoutCategory();
        },(error:any)=>{
          this._snackBar.open(`Product ${this.Products[event.previousIndex].name} Classer Au Category ${category.nom}`, 'close', {
            duration: 3000
          });
          this.GetCatg();
          this.ProductsWithoutCategory();
        })
    }
  }

  LibererProduct(id:number){
     this.AdminServiceService.LibererProduct(id).subscribe((res:any)=>{
      this.ProductsWithoutCategory();
      this.GetCatg();
     },(error:any)=>{
      this.ProductsWithoutCategory();
      this.GetCatg();
     })
  }

  openDialog(product:any){
    this.dialog.open<string>(DialogInfoComponent,{
      data:product
    });
  }

  Categories:any;
  Products:any;
  Product:any;
  Search:String=""

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

  serachWithProduct() {
    if (this.Search !== '') {
      this.Products = this.Products.filter((product:any) =>
        product.name.toLowerCase().includes(this.Search.toLowerCase())
      );
    } else {
      this.ProductsWithoutCategory();
    }
  }
}
