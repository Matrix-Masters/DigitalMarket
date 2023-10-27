import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalAcceptedProducts = 0;
  pageSize = 5;
  pageIndex = 0;

  getAcceptedProduits() {
    this.AdminServiceService.GetAcceptedProducts(this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.AcceptedProducts = res.product.content;
      this.totalAcceptedProducts = res.product.totalElements;
    });
  }

  handlePageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAcceptedProduits();
    this.getPendingProducts();
    this.getRefusedProducts();
  }

  getRefusedProducts() {
    this.AdminServiceService.GetRefusedProducts(this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.RefusedProducts = res.product.content;
      this.totalAcceptedProducts = res.product.totalElements;
    });
  }

  getPendingProducts() {
    this.AdminServiceService.GetPendingProducts(this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.PendingProducts = res.product.content;
      this.totalAcceptedProducts = res.product.totalElements;

    });
  }

  onPageChange(page: number) {
    this.pageIndex = page;
    this.getAcceptedProduits();
    this.getPendingProducts();
    this.getRefusedProducts();
  }

  updateProducts(event:any){
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
