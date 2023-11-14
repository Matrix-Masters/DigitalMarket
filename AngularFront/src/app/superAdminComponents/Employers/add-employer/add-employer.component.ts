import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenerateAccountDialogComponent } from '../generate-account-dialog/generate-account-dialog.component';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent {
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  role: string = '';

  constructor(private dialog: MatDialog) {}

  submitForm() {
    this.openGenerateAccountDialog();
  }

  openGenerateAccountDialog() {
    const dialogRef = this.dialog.open(GenerateAccountDialogComponent, {
      data: {
        firstName: this.firstName,
        lastName: this.lastName
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}
}
