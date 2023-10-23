import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accepted-products',
  templateUrl: './accepted-products.component.html',
  styleUrls: ['./accepted-products.component.scss']
})
export class AcceptedProductsComponent {
  @Input() type = '';
  modalVisible: boolean = false;

  showProductInfo() {
    this.modalVisible = true;
  }
  hideModal($event : any){
    this.modalVisible=false;
  }
}
