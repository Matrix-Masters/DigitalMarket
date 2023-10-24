import { Component,EventEmitter,Inject, Input, Output  } from '@angular/core';
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
  hideModal() {
    this.hide.emit('hide');
  }
  AcceptProduit(id:number){
    this.AdminServiceService.AcceptProduit(id).subscribe(res=>{
        console.log(res);
    })
  }
  RefuseProduct(id:number){
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
