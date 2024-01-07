import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FournisseurServiceService } from 'src/app/Service/fournisseur-service.service';

@Component({
  selector: 'app-list-products-fournisseur',
  templateUrl: './list-products-fournisseur.component.html',
  styleUrls: ['./list-products-fournisseur.component.scss']
})
export class ListProductsFournisseurComponent implements OnInit {

  user:any;
  constructor(private store:Store,private FournisseurServiceService:FournisseurServiceService){
    this.user=this.store.selectSnapshot(s=>s.AuthStore?.User)
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

  Status:number=1;
  search:string="";
  loading:boolean=true;

  getProduct(){
    this.FournisseurServiceService.getProductFournisseur(
      this.user['iduser'],this.pagination.currentpage,this.pagination.per_page,this.search,this.Status
    ).subscribe((res:any)=>{
       this.Products=res.data.content;
       this.pagination.currentpage=res.page;
       this.pagination.next=res.data.last;
       this.pagination.previous=res.data.first;
       this.pagination.count_page=res.count_page;
       this.loading=false;
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

  onPerPageChange() {
    this.pagination.per_page=this.selectedPerPage;
    this.getProduct();
  }
}
