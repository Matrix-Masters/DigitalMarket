import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenerateAccountDialogComponent } from '../generate-account-dialog/generate-account-dialog.component';
import { SuperAdminServiceService } from 'src/app/Service/super-admin-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent {
  // firstName: string = '';
  // lastName: string = '';
  // gender: string = '';
  // role: string = '';
  generatedEmail:string='';
  generatedPassword:string='';
  //PhoneNumber: string = '';
  employerForm: FormGroup;
  constructor(private dialog: MatDialog,private superAdminService:SuperAdminServiceService,private router: Router,private formBuilder: FormBuilder) {
    this.employerForm = this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
      lastName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
      PhoneNumber: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  isFieldInvalid(fieldName: string, errorType: string): boolean {
    const field = this.employerForm.get(fieldName);
    return field ? field.hasError(errorType) && (field.dirty || field.touched) : false;
  }
  submitForm() {
    // Check if the form is valid before proceeding
    if (this.employerForm.valid) {
      this.openGenerateAccountDialog();


      let Employer = {
        firstName: this.employerForm.value.firstName,
        lastName: this.employerForm.value.lastName,
        email: this.generatedEmail,
        password: this.generatedPassword,
        numTlf: this.employerForm.value.PhoneNumber,
        role: this.employerForm.value.role,
        sexe: this.employerForm.value.gender,
      };

      this.superAdminService.AddEmployer(Employer).subscribe((data) => {
        console.log(data);
      });

      this.employerForm.reset();
    }
  }
  generateAccountInfo() {
    let randomNumbers = '';
    for (let i = 0; i < 3; i++) {
      randomNumbers += Math.floor(Math.random() * 10);
    }
    this.generatedEmail = `${this.employerForm.value.firstName.toLowerCase()}.${this.employerForm.value.lastName.toLowerCase()}${randomNumbers}@digitalMarket.com`;
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
        firstName: this.employerForm.value.firstName,
        lastName: this.employerForm.value.lastName,
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
