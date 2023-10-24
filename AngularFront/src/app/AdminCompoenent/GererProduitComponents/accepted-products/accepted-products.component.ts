import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accepted-products',
  templateUrl: './accepted-products.component.html',
  styleUrls: ['./accepted-products.component.scss']
})
export class AcceptedProductsComponent {
  @Input() type = '';
  @Input() products=[];
  modalVisible: boolean = false;
  Product:any;

  showProductInfo(product:any) {
    this.modalVisible = false;
    this.Product=product;
    console.log(this.Product);

  }
  hideModal($event : any){
    this.modalVisible=false;
  }
}
