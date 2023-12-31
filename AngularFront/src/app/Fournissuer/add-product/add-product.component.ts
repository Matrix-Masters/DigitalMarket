import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductServiceService } from 'src/app/Service/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  AddProductForm:FormGroup;


  constructor(private ProductsService: ProductServiceService,private formBuilder:FormBuilder,private MatSnackBar:MatSnackBar){
    this.AddProductForm = this.formBuilder.group({
      Name:this.NameForm,
      Description:this.DescriptionForm,
      Prix:this.PrixForm,
      Quantite:this.QuantiteForm
    });

  }

  NameForm=new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]);
  DescriptionForm=new FormControl('',[Validators.required,Validators.minLength(20),Validators.maxLength(70)]);
  PrixForm=new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(7),Validators.pattern("^[0-9]*$")]);
  QuantiteForm=new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(4),Validators.pattern("^[0-9]*$")]);

  getNameFormError(){
    if(this.NameForm.touched){
      if(this.NameForm.hasError("required")){
         return 'You must enter a product name';
      } else if(this.NameForm.hasError("minlength")){
        return 'Product name length must be at least 1' ;
      }else if(this.NameForm.hasError("maxlength")){
        return 'Product name length must be at most 7';
      }
    }
    return '';
  }

  getDescriptionFormError(){
    if(this.DescriptionForm.touched){
      if(this.DescriptionForm.hasError("required")){
         return 'You must enter a product description';
      } else if(this.DescriptionForm.hasError("minlength")){
        return 'Product description length must be at least 20' ;
      }else if(this.DescriptionForm.hasError("maxlength")){
        return 'Product description length must be at least 70' ;
      }
    }
    return '';
  }

  getPrixFormError(){
    if(this.PrixForm.touched){
      if(this.PrixForm.hasError("required")){
         return 'You must enter a product price TND';
      } else if(this.PrixForm.hasError("minlength")){
        return 'Product price length must be at least 1' ;
      }else if(this.PrixForm.hasError("maxlength")){
        return 'Product price length must be at least 7' ;
      }else{
        return 'Product price must accept only numbers' ;
      }
    }
    return '';
  }

  getQuantiteFormError(){
    if(this.QuantiteForm.touched){
      if(this.QuantiteForm.hasError("required")){
         return 'You must enter a product quantity';
      } else if(this.QuantiteForm.hasError("minlength")){
        return 'Product quantity length must be at least 1' ;
      }else if(this.QuantiteForm.hasError("maxlength")){
        return 'Product quantity length must be at least 4' ;
      }else{
        return 'Product price must accept only numbers' ;
      }
    }
    return '';
  }

  imageError:String=""
  image:any

  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.image=file
    console.log(this.image);

  }

  AddProduct() {
    if (this.AddProductForm.valid) {
        if (this.image){
            this.ProductsService.addProduct(
                this.image,
                this.AddProductForm.value['Name'],
                this.AddProductForm.value['Description'],
                this.AddProductForm.value['Quantite'],
                this.AddProductForm.value['Prix']
            ).subscribe(
              res=>{
                console.log(res);
                this.AddProductForm.reset();
                this.MatSnackBar.open('Product added with success', '', {
                  duration: 3000,
                });
              },
              err=>{
                console.log(err);

              }
            );
        } else {
            this.imageError = "You must upload an image";
        }
    } else {
        this.AddProductForm.markAllAsTouched();
    }
}

  ngOnInit(): void {

  }


}
