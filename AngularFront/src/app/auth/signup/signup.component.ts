import { Component } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { PythonServiceService } from 'src/app/Service/python-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  
  constructor(private formBuilder:FormBuilder,
      private AuthServiceService:AuthServiceService,
      private PythonServiceService:PythonServiceService,
      private MatSnackBar:MatSnackBar
      ) {
 
    this.SignUpForm=this.formBuilder.group({
      FirstName:this.FirstNameForm,
      LastName:this.LastNameForm,
      Email:this.EmailForm,
      Password:this.passwordForm,
      NumTlf:this.NumTlfForm,
      Sex:this.SexForm,
      RoleFor:this.RoleForFrom,
  
    });

  }
 
 

  NumTlfForm=new FormControl('',[Validators.required]);
  FirstNameForm=new FormControl('',[Validators.required]);
  LastNameForm=new FormControl('',[Validators.required]);
  EmailForm=new FormControl('',[Validators.required,Validators.email]);
  passwordForm=new FormControl('',[Validators.required]);
  SexForm=new FormControl('',[Validators.required]);
  RoleForFrom=new FormControl('',[Validators.required]);

  getFirstNameFormError(){
    if(this.FirstNameForm.touched){
      if(this.FirstNameForm.hasError("required")){
         return 'You must enter a first name';
      }  
      }
      return '';
    }

  

    getLastNameFormError(){
      if(this.LastNameForm.touched){
        if(this.LastNameForm.hasError("required")){
           return 'You must enter a last name';
        }  
        }
        return '';
      }

      geRoleForFromError(){
        if(this.LastNameForm.touched){
          if(this.LastNameForm.hasError("required")){
             return 'You must enter a Role';
          }  
          }
          return '';
        }

        getNumTlfFormError(){
          if(this.NumTlfForm.touched){
            if(this.NumTlfForm.hasError("required")){
               return 'You must enter a phone number';
            }  
            }
            return '';
          }

      getpasswordFormError(){
        if(this.passwordForm.touched){
          if(this.passwordForm.hasError("required")){
             return 'You must enter a password';
          }
          }
          return '';
        }

        getSexFormError(){
          if(this.SexForm.touched){
            if(this.SexForm.hasError("required")){
               return 'You must enter a gennder';
            }
            }
            return '';
          }

      getEmailFormError(){
        if(this.EmailForm.touched){
          if(this.EmailForm.hasError("required")){
             return 'You must enter a email';
          }else{
            if(this.EmailForm.hasError("email")){
              return 'You must enter a valid email';
            }
          }
          }
          return '';
        }

       

  imageError:String=""
  image:String="";

  SignUpForm:FormGroup;
  imageCin:String="";
  SignupError="";

  role:any='';

  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.imageCin=file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
    };
    if(this.image.length>0){
      this.imageError="";
    }
  }

  visibility:boolean=false; 

  SignUp(){
    if(this.SignUpForm.valid){
      if(this.SignUpForm.value['RoleFor']=="Supplier"){
        if(this.image.length>0){
          this.imageError="";
          this.PythonServiceService.AddPhoto(this.imageCin).subscribe((res:any)=>{
          this.AuthServiceService.AdddUser(
              this.SignUpForm.value['RoleFor'],
              {
                "password": this.SignUpForm.value['Password'],
                "photoCin": this.image,
                "lastName": this.SignUpForm.value['LastName'],
                "cin": res['Number'],
                "email": this.SignUpForm.value['Email'],
                "numTlf":this.SignUpForm.value['NumTlf'],
                "sexe":this.SignUpForm.value['Sex'],
                "firstName":this.SignUpForm.value['FirstName'],
                "photo":null,
              }
            ).subscribe((res:any)=>{
                console.log(res);
            },(error)=>{
              this.MatSnackBar.open(error.error.error,'',{
                duration:2000,
              })
            })
          },(err)=>{
            this.MatSnackBar.open(err.error.error,'',{
              duration:2000,
            })
          })
        }else{
          this.imageError="You must upload an image";
        }
      }else{
        this.AuthServiceService.AdddUser(
          this.SignUpForm.value['RoleFor'],
          {
            "password": this.SignUpForm.value['Password'],
            "lastName": this.SignUpForm.value['LastName'],
            "email": this.SignUpForm.value['Email'],
            "numTlf":this.SignUpForm.value['NumTlf'],
            "sexe":this.SignUpForm.value['Sex'],
            "firstName":this.SignUpForm.value['FirstName'],
            "photo":null,
          }
        ).subscribe((res:any)=>{
            console.log(res);
        },(error)=>{
           this.MatSnackBar.open(error.error.error,'',{
             duration:2000,
          })
        })
      }
    }else{
      this.SignUpForm.markAllAsTouched();
    }
  }

}