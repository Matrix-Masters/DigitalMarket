import { Component,ElementRef,EventEmitter,Inject, Input, Output, ViewChild  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
@Component({
  selector: 'app-info-produit',
  templateUrl: './info-produit.component.html',
  styleUrls: ['./info-produit.component.scss']
})
export class InfoProduitComponent {
  constructor(private AdminServiceService: AdminServiceService,private _snackBar: MatSnackBar) {}
  @Input() visible: boolean = false;
  @Input() Product : any=null;
  @Output() hide = new EventEmitter<string>();
  @Output() updateProducts = new EventEmitter<string>();
  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  hideModal() {
    this.hide.emit('hide');
  }

  UpdateProducts() {
    this.updateProducts.emit('update products');
  }
  closeModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (modalBackdrop) {
        document.body.removeChild(modalBackdrop);
      }
    }
  }
  AcceptProduit(id:number){
    this.AdminServiceService.AcceptProduit(id).subscribe((res: any)=>{
      this.updateProducts.emit('update products');
      console.log("send from info");
      //this.closeBtn.nativeElement.click();
        this.closeModal();
      this._snackBar.open("product accepted", 'close', {
        duration: 3000
      })

    }),(error:any)=>{
      this._snackBar.open("there was a problem with your action", 'close', {
        duration: 3000
      })
    }
  }
  RefuseProduct(id:number){
    this.AdminServiceService.RejectProduct(id).subscribe((res: any)=>{
      //this.updateProducts.emit('update products');
      console.log("send from info");
      this.closeBtn.nativeElement.click();
      this._snackBar.open("product Refused", 'close', {
        duration: 3000
      })
    }),(error:any)=>{
      this._snackBar.open("there was a problem with your action", 'close', {
        duration: 3000
      })
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
