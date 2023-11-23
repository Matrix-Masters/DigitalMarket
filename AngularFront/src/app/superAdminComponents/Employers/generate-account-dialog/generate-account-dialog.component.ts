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
    this.generatedEmail = this.data.generatedEmail;
    this.generatedPassword = this.data.generatedPassword;
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
