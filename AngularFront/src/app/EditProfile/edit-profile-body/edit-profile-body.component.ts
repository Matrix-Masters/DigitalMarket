import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from 'src/app/Model/User_Store';

import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-edit-profile-body',
  templateUrl: './edit-profile-body.component.html',
  styleUrls: ['./edit-profile-body.component.scss']
})
export class EditProfileBodyComponent implements OnInit{
[x: string]: any;
editInfoGroup:FormGroup;
  user:User;
  id:any;
  constructor(private store:Store,private userService:UserServiceService,private formBuilder:FormBuilder){
    
    this.user=this.store.selectSnapshot(s=>s.AuthStore?.User)
    this.id=this.user?.iduser;

    this.editInfoGroup = this.formBuilder.group({
        firstName:this.firstNameForm,
        lastName:this.lastNameForm,
        num:this.numForm
      })

      this.emailGroupValid=this.formBuilder.group({
        old_email:this.old_emailForm,
        new_email:this.new_emailForm,
      });

      this.firstNameForm.setValue(this.user?.firstName.toString());
      this.lastNameForm.setValue(this.user?.lastName.toString());
      this.numForm.setValue(this.user.numTlf);
      this.old_emailForm.setValue(this.user.email.toString());
     
    }

    EmailValid(email: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const emailNew = control.value;
        if (emailNew != email) {
          return null;  
        } else {
          return { 'SomeEmail': true };  
        }
      };
    }

  emailGroupValid:FormGroup;
  firstNameForm=new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]);
  lastNameForm=new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]);
  cinForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  numForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  old_emailForm=new FormControl('',[Validators.required,Validators.email]);
  new_emailForm = new FormControl('', [Validators.required, Validators.email, this.EmailValid(this.old_emailForm.value!)]);
  
  old_emailFormError(){
    if(this.old_emailForm.touched){
      if(this.old_emailForm.hasError("required")){
         return 'You must enter a email';
      } else if(this.old_emailForm.hasError("email")){
        return 'Your email is not valid' ;
      }
    }
    return '';
  }

  new_emailFormError(){
    if(this.new_emailForm.touched){
      if(this.new_emailForm.hasError("required")){
         return 'You must enter a email';
      } else if(this.new_emailForm.hasError("email")){
        return 'Your email is not valid' ;
      }else if(this.new_emailForm.hasError("SomeEmail")){
        return 'Your email is not valid' ;
      }
    }
    return '';
  }
  
  firstNameFormError(){
    if(this.firstNameForm.touched){
      if(this.firstNameForm.hasError("required")){
         return 'You must enter a first name';
      } else if(this.firstNameForm.hasError("minlength")){
        return 'Your first name length must be at least 8' ;
      }else if(this.firstNameForm.hasError("maxlength")){
        return 'Your first name length must be at least 20';
      }
    }
    return '';
  }

  lastNameFormError(){
    if(this.lastNameForm.touched){
      if(this.lastNameForm.hasError("required")){
         return 'You must enter a last name';
      } else if(this.lastNameForm.hasError("minlength")){
        return 'Your last name length must be at least 2' ;
      }else if(this.lastNameForm.hasError("maxlength")){
        return 'Your last name length must be at least 20';
      }
    }
    return '';
  }

  cinFormError(){
    if(this.cinForm.touched){
      if(this.cinForm.hasError("required")){
         return 'You must enter a cin';
      } else if(this.cinForm.hasError("minlength")){
        return 'Your cin length must be at least 8' ;
      }else if(this.cinForm.hasError("maxlength")){
        return 'Your cin length must be at least 8';
      }else if(this.lastNameForm.hasError("pattern")){
        return 'Cin  accept only numbers' ;
      }
    }
    return '';
  }

  numFormError(){
    if(this.numForm.touched){
      if(this.numForm.hasError("required")){
         return 'You must enter a phone number';
      } else if(this.numForm.hasError("minlength")){
        return 'Your phone number length must be at least 8' ;
      }else if(this.numForm.hasError("maxlength")){
        return 'Your phone number length must be at least 8';
      }else if(this.lastNameForm.hasError("pattern")){
        return 'Phone number  accept only numbers' ;
      }
    }
    return '';
  }


  getUserById(){
    this.userService.getUserById(this.id).subscribe((res:any)=>{
      this.user.firstName = res.firstName
      this.user.lastName = res.lastName
      this.user.numTlf=res.numTlf
    },(error:any)=>{
     console.log(error);
    }
    )
  }

  updateUser(user:User){
    if (this.editInfoGroup.valid) {
      this.userService.updateUser(user,this.id).subscribe((res:any)=>{
        console.log(res);
        location.reload()
      },(error:any)=>{
        console.log(error);
      }
      )
    }else{
      this.editInfoGroup.markAllAsTouched();
    }

  }

  UpdateEmail(){
    if (this.emailGroupValid.valid) {
        this.userService.SendEmailChanged(this.old_emailForm.value,this.new_emailForm.value).subscribe((res:any)=>{
          console.log(res);
        },(error:any)=>{
          console.log(error);
        });
    }else{
      this.emailGroupValid.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getUserById()
  }

}
