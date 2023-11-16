import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenerateAccountDialogComponent } from '../generate-account-dialog/generate-account-dialog.component';
import { SuperAdminServiceService } from 'src/app/Service/super-admin-service.service';

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
  PhoneNumber: string = '';
  constructor(private dialog: MatDialog,private superAdminService:SuperAdminServiceService) {}

  submitForm() {
    this.openGenerateAccountDialog();
    let Employer={
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.generatedEmail,
      password: this.generatedPassword,
      numTlf: this.PhoneNumber,
      role:this.role,
      sexe: this.gender
  }
  this.superAdminService.AddEmployer(Employer).subscribe((data)=>{
    console.log(data);
  });

  }
  generateAccountInfo() {
    let randomNumbers = '';
    for (let i = 0; i < 3; i++) {
      randomNumbers += Math.floor(Math.random() * 10);
    }
    this.generatedEmail = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}${randomNumbers}@digitalMarket.com`;
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
