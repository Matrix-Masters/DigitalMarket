import { Component } from '@angular/core';
import { Category } from 'src/app/Model/Category';
import { AdminServiceService , CategoryResponse} from 'src/app/Service/admin-service.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

    
  CategoryId!:any
  
  selectedCategory: CategoryResponse | null = null;



  isPopupOpen: boolean = false;

  openPopup(CategoryId: any) {
    this.isPopupOpen = true;
    this.selectedCategory = this.categories.find((item) => item.id === CategoryId) || null;
    console.log(CategoryId);
    
  }
  
  

  
  closePopup() {
    this.isPopupOpen = false;
    console.log("closed")
  }

  
  fileTooLarge: boolean = false;

  onFileChanged(event: any) {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
      console.log(this.image);
      console.log(this.selectedCategory?.image);
      
     
      
    };
    
  }
  
    categories!:CategoryResponse[];
  constructor(private AdminServiceService :AdminServiceService){}

  ngOnInit()
  {
    this.getCategoryList()
  }
  getCategoryList()
  {
    this.AdminServiceService.getCategory().subscribe((res:any)=>{
      console.log(res);
      this.categories = res;
    });
  }

  
  DeleteCategory(CategoryId: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
  
    if (confirmDelete) {
      this.AdminServiceService.destroyCategory(CategoryId).subscribe(
        (res: any) => {
          this.getCategoryList();
             
        },
        (error) => {
       
          console.error('An error occurred:', error);
          alert('Category deleted successfully');
          this.getCategoryList();
        }
      );
    }
  }
  nom:any
  image:any
  updateCategory() {
    if (this.selectedCategory)
     {
      console.log(this.selectedCategory);
      this.selectedCategory.image= this.image;
      this.AdminServiceService.updateCategory(this.selectedCategory.id, this.selectedCategory)
        .subscribe((res: any) => {
          if (res) {
            
          } else {
            alert('Category update failed. Please check again.');
          }
        }, (error) => {
          this.getCategoryList();
          alert('Category updated successfully');
          this.closePopup();
        });
    }
  }
  
  
  
}
