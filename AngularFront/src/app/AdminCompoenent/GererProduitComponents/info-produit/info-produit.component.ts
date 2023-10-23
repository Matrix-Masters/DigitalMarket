import { Component,EventEmitter,Inject, Input, Output  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-produit',
  templateUrl: './info-produit.component.html',
  styleUrls: ['./info-produit.component.scss']
})
export class InfoProduitComponent {
  @Input() visible: boolean = false;
  @Output() hide = new EventEmitter<string>();
  constructor(){
    console.log(this.visible);
  }
  hideModal() {
    this.hide.emit('hide');
  }
}
