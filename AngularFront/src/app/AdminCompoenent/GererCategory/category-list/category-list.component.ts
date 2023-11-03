import { Component } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {


  isPopupOpen: boolean = false;
  openPopup() {
    this.isPopupOpen = true;
    console.log("works")
  }

  
  closePopup() {
    this.isPopupOpen = false;
    console.log("closed")
  }

  
  fileTooLarge: boolean = false;

  onFileSelected(event: any) {
    const files = event.target.files as File[];
    const maxSize = 4 * 1024 * 1024; 
  
    const fileTooLarge = files.some((file: File) => file.size > maxSize);
  
    if (fileTooLarge) {
      console.log("file big")
    } else {
      console.log("file small")
    }
  }
}
