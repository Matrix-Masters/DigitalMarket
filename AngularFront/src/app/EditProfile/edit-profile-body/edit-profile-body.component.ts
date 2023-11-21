import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/Model/User';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-edit-profile-body',
  templateUrl: './edit-profile-body.component.html',
  styleUrls: ['./edit-profile-body.component.scss']
})
export class EditProfileBodyComponent implements OnInit{
[x: string]: any;
editInfoGroup:FormGroup;

  id:any=19
  user:User = { firstName: '', lastName:'',sexe: '',cin:'' ,numTlf:''}
  constructor(private userService:UserServiceService,private formBuilder:FormBuilder){
    this.editInfoGroup = this.formBuilder.group({

        firstName:this.firstNameForm,
        lastName:this.lastNameForm,
        cin:this.cinForm,
        num:this.numForm
      })

  }
  firstNameForm=new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]);
  lastNameForm=new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]);
  cinForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  numForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);

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
      this.user.cin=res.cin
      this.user.numTlf=res.numTlf
      this.user.sexe = res.sexe;
     console.log(res);

    },(error:any)=>{
     console.log(error);
    }
    )
  }

  updateUser(user:User){
    if (this.editInfoGroup.valid) {
      this.userService.updateUser(user,19).subscribe((res:any)=>{
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



  ngOnInit(): void {
    this.getUserById()
  }




}
