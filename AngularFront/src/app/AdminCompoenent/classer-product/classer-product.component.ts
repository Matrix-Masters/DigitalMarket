import { Component, OnInit,Inject } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {
  CdkDragDrop,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
export interface DialogData {
  animal: string;
  name: string;
}
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

@Component({
  selector: 'app-classer-product',
  templateUrl: './classer-product.component.html',
  styleUrls: ['./classer-product.component.scss'],
 
})
export class ClasserProductComponent implements OnInit {
  constructor(public AdminServiceService: AdminServiceService,private _snackBar: MatSnackBar,private dialog:Dialog,private alertdialog:MatDialog) {}

  drop(event: CdkDragDrop<any[]>,category?:any): void {
    if (event.previousContainer === event.container) {
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


  openDialogAlert(product: any): void {
    const dialogRef = this.alertdialog.open(DialogOverviewExampleDialog, {
      data: product,
    });
    dialogRef.componentInstance.rejectProduct = () => {
      this.RejectProduct(product['id']);
      this.ProductsWithoutCategory();
      dialogRef.close();
    };
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

  RejectProduct(id:number){
    this.AdminServiceService.RejectProduct(id).subscribe((res:any)=>{
       this.ProductsWithoutCategory();
    },(error:any)=>{
      this.ProductsWithoutCategory();
      this._snackBar.open(`Product Deleted`, 'close', {
        duration: 3000
      });
    })
  }
}

@Component({
  selector: 'AlertDialog',
  templateUrl: './AlertDialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
  rejectProduct() {
    this.dialogRef.close(); 
  }

  
}