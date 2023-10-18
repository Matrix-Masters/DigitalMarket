import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  imports:[
    MatIconModule,
    DragDropModule
  ],

  exports:[
    MatIconModule,
    DragDropModule
]

})
export class MaterialModule { }
