import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
@Component({
  selector: 'app-gerer-produit',
  templateUrl: './gerer-produit.component.html',
  styleUrls: ['./gerer-produit.component.scss']
})
export class GererProduitComponent implements OnInit {
  constructor(private AdminServiceService: AdminServiceService) {}
  accepted="accepted"
  refused="refused"
  pending="pending"
  AcceptedProducts:any;
  RefusedProducts:any;
  PendingProducts:any;
  getAcceptedProduits(){
    this.AdminServiceService.GetAcceptedProducts().subscribe((res:any)=>{
      this.AcceptedProducts=res.product.content;
      console.log(this.AcceptedProducts);
    });
  }
  getRefusedProducts(){
    this.AdminServiceService.GetRefusedProducts().subscribe((res:any)=>{
      this.RefusedProducts=res.product.content;
      console.log(this.RefusedProducts);
    });
  }
  getPendingProducts(){
    this.AdminServiceService.GetPendingProducts().subscribe((res:any)=>{
      this.PendingProducts=res.product.content;
      console.log(this.PendingProducts);
    });
  }
  updateProducts($event:string){
      this.getAcceptedProduits();
      this.getPendingProducts();
      this.getRefusedProducts();
  }
  ngOnInit(): void {
    this.getAcceptedProduits();
    this.getPendingProducts();
    this.getRefusedProducts();
  }
}
