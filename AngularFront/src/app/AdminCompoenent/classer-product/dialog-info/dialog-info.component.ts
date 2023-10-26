import { Component,Inject  } from '@angular/core';
import {DialogRef} from '@angular/cdk/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {
   Product:any;
   constructor(public dialogRef: DialogRef,@Inject(DIALOG_DATA) public data: any) {
    this.Product=data;
   }
}
