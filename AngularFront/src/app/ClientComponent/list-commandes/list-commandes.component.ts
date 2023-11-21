import { Component, OnInit } from '@angular/core';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductServiceService } from 'src/app/Service/product-service.service';
@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ])
  ]
})
export class ListCommandesComponent implements OnInit{
  selectedCommandes=-1;
  page = 1;
  limit = 1;
  pages = 100;
  total=0;
  commandes:any;
    constructor(private CommandeService :  CommandeServiceService , private productService:ProductServiceService) { }
    ngOnInit(): void {
      this.getCommandeByIdClient();
    }
    onPageChange(page: number): void {
      this.page = page;
      this.getCommandeByIdClient();
    }
    getCommandeByIdClient(){
      this.CommandeService.getCommandeByIdClient(1,this.page,this.limit).subscribe((res:any)=>{
          this.commandes=res.docs;
          this.total=res.total;
          this.pages=res.pages;
          this.page=res.page;
          this.limit=res.limit;
      }),
      (error:any)=>{
        console.log(error);
      }
  }
  toggleRowDetails(index: number): void {
    this.selectedCommandes = index==this.selectedCommandes ? -1 : index;
  }
  getProductById(id:any){
    this.productService.getProductById(id).subscribe((res:any)=>{
      console.log(res);
        return res;
    }),
    (error:any)=>{
      console.log(error);
    }
  }
}
