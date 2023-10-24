import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  imports:[
    MatIconModule,
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    ScrollingModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatBadgeModule
  ],

  exports:[
    MatIconModule,
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    ScrollingModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatBadgeModule
]

})
export class MaterialModule { }
