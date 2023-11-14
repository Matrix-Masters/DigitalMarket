import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-generate-account-dialog',
  templateUrl: './generate-account-dialog.component.html',
  styleUrls: ['./generate-account-dialog.component.scss']
})
export class GenerateAccountDialogComponent {
  generatedEmail: string = '';
  generatedPassword: string = '';

  constructor(
    public dialogRef: MatDialogRef<GenerateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.generateAccountInfo();
  }

  generateAccountInfo() {
    this.generatedEmail = `${this.data.firstName.toLowerCase()}.${this.data.lastName.toLowerCase()}@digitalMarket.com`;
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
  downloadTxt() {
    const content = `Email: ${this.generatedEmail}\nPassword: ${this.generatedPassword}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    saveAs(blob, 'generated-account.txt');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
