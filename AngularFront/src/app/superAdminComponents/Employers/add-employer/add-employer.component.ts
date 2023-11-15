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
  generatedEmail:string='';
  generatedPassword:string='';
  constructor(private dialog: MatDialog) {}

  submitForm() {
    this.openGenerateAccountDialog();
  }
  generateAccountInfo() {
    this.generatedEmail = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@digitalMarket.com`;
    this.generatedPassword = this.generateRandomPassword();
  }

  generateRandomPassword(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*-+!@#$%^&()_';
    const passwordLength = 8;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
  openGenerateAccountDialog() {
    this.generateAccountInfo();
    const dialogRef = this.dialog.open(GenerateAccountDialogComponent, {
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        generatedEmail:this.generatedEmail,
        generatedPassword:this.generatedPassword,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}
}
