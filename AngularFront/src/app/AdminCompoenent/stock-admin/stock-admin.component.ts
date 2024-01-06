import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductServiceService } from 'src/app/Service/product-service.service';

@Component({
  selector: 'app-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrls: ['./stock-admin.component.scss']
})
export class StockAdminComponent implements OnInit{

  constructor(private ProductServiceService:ProductServiceService,private MatSnackBar:MatSnackBar){

  }

  ngOnInit(): void {
    this.getProduct();
  }
  Products:any;
  
  pagination={
    currentpage:0,
    per_page:5,
    count_page:[],
    next:null,
    previous:null
  }

  search:string="";

  getProduct(){
    this.ProductServiceService.AllProduct(
        this.pagination.currentpage,this.pagination.per_page,this.search
    ).subscribe((res:any)=>{
       this.Products=res.product.content;
       this.pagination.currentpage=res.page;
       this.pagination.next=res.product.last;
       this.pagination.previous=res.product.first;
       this.pagination.count_page=res.count_page;
    })
  }

  changerPage(num:number){
    if(num<0){
      num=0;
    }
    this.pagination.currentpage=num;
    this.getProduct();
  }

  onSearchChange(){
    this.getProduct();
  }

  selectedPerPage: number=5; 

  IncementQte(id:number,qte:number){
    this.ProductServiceService.IncrementQteProd(id,qte).subscribe((res:any)=>{
      this.MatSnackBar.open("Quantity Changed with success",'close',{
              duration:2000
      }
      )
       this.getProduct();
    })
  }

  onPerPageChange() {
    this.pagination.per_page=this.selectedPerPage;
    this.getProduct();
  }
  

}
