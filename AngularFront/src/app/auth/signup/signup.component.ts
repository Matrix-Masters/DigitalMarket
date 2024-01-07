import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { PythonServiceService } from 'src/app/Service/python-service.service';
import { SecurityServiceService } from 'src/app/Service/security-service.service';
import { Logout } from 'src/app/Store/state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  user:any;
  ngOnInit(): void {
    this.user=this.store.selectSnapshot(s=>s.AuthStore?.User);
  }

  constructor(
      private formBuilder:FormBuilder,
      private AuthServiceService:AuthServiceService,
      private PythonServiceService:PythonServiceService,
      private MatSnackBar:MatSnackBar,
      private SecurityServiceService:SecurityServiceService,
      private keycloakService: KeycloakService,
      private router:Router,
      private store:Store
    )
    {
    this.user=this.store.selectSnapshot(s=>s.AuthStore?.User);
    //this.SecurityServiceService.init();
    this.SignUpForm=this.formBuilder.group({
      FirstName:this.FirstNameForm,
      LastName:this.LastNameForm,
      Email:this.EmailForm,
      //Password:this.passwordForm,
      NumTlf:this.NumTlfForm,
      Sex:this.SexForm,
      RoleFor:this.RoleForFrom,
    });
    this.FirstNameForm.setValue(this.user?.firstName);
    this.LastNameForm.setValue(this.user?.lastName);
    this.EmailForm.setValue(this?.user?.email);
  }



  NumTlfForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  FirstNameForm=new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]);
  LastNameForm=new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]);
  EmailForm=new FormControl('',[Validators.required,Validators.email]);
  passwordForm=new FormControl('',[Validators.required,Validators.minLength(8)]);
  SexForm=new FormControl('',[Validators.required]);
  RoleForFrom=new FormControl('',[Validators.required]);

  getFirstNameFormError(){
    if(this.FirstNameForm.touched){
      if(this.FirstNameForm.hasError("required")){
        return 'You must enter a first name';
      } else if(this.FirstNameForm.hasError("minlength")){
        return 'You must enter a valid first name';
      }else if(this.FirstNameForm.hasError("maxlength")){
        return 'You must enter a valid first name';
      }
    }
    return '';
  }



    getLastNameFormError(){
      if(this.LastNameForm.touched){
        if(this.LastNameForm.hasError("required")){
           return 'You must enter a last name';
          }else if(this.LastNameForm.hasError("minlength")){
            return 'You must enter a valid last name';
        }else if(this.LastNameForm.hasError("maxlength")){
          return 'You must enter a valid last name';
        }
      }
      return '';
    }

      geRoleForFromError(){
        if(this.RoleForFrom.touched){
          if(this.RoleForFrom.hasError("required")){
             return 'You must enter a Role';
          }
          }
          return '';
        }

        getNumTlfFormError(){
          if(this.NumTlfForm.touched){
            console.log(this.NumTlfForm);
            if(this.NumTlfForm.hasError("required")){
               return 'You must enter a phone number';
            }else if(this.NumTlfForm.hasError("minlength")){
              return 'You must enter a valid phone number';
            }else if(this.NumTlfForm.hasError("maxlength")){
              return 'You must enter a valid phone number';
            }else if(this.NumTlfForm.hasError("pattern")){
               return 'You must enter Just numbers';
            }
          }
          return '';
        }


      getPasswordFormError(){
        if(this.passwordForm.touched){
          if(this.passwordForm.hasError("required")){
             return 'You must enter a password';
          }else if(this.passwordForm.hasError("minlength")){
            return 'You must enter a valid password';
          }
          //  return 'Password must contain at least one uppercase letter , one lowercase letter and one number';
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

  LoginUser(){
    this.SecurityServiceService.logout();
    this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

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
              {
                "password": "empty",
                "photoCin": this.image,
                "lastName": this.SignUpForm.value['LastName'],
                "cin": res['Number'],
                "email": this.SignUpForm.value['Email'],
                "numTlf":this.SignUpForm.value['NumTlf'],
                "sexe":this.SignUpForm.value['Sex'],
                "firstName":this.SignUpForm.value['FirstName'],
                "photo":null,
                "role":this.SignUpForm.value['RoleFor'],
                "keycloak_id":this.user._id
              }
            ).subscribe((res:any)=>{
              this.MatSnackBar.open(res.data,'',{
                 duration:2000,
               })
                this.SignUpForm.reset();
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
          {
            "password": "empty",
            "lastName": this.SignUpForm.value['LastName'],
            "email": this.SignUpForm.value['Email'],
            "numTlf":this.SignUpForm.value['NumTlf'],
            "sexe":this.SignUpForm.value['Sex'],
            "firstName":this.SignUpForm.value['FirstName'],
            "photo":null,
            "role":this.SignUpForm.value['RoleFor'],
            "keycloak_id":(this.user._id).toString()
          }
        ).subscribe((res:any)=>{
            this.MatSnackBar.open(res.data,'',{
              duration:2000,
           })
            this.SignUpForm.reset();
        },(error)=>{
          console.log(error);
          this.MatSnackBar.open(error.error,'',{
            duration:2000,
         })
        })
      }
    }else{
      this.SignUpForm.markAllAsTouched();
    }
    /*this.keycloakService.logout();
    this.store.dispatch(new Logout());
    this.keycloakService.login({
      redirectUri: window.location.origin
    })*/
  }

}
