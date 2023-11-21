import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-edit-profile-body',
  templateUrl: './edit-profile-body.component.html',
  styleUrls: ['./edit-profile-body.component.scss']
})
export class EditProfileBodyComponent implements OnInit{
[x: string]: any;
  id:any=19
  user:User = { firstName: '', lastName:'',sexe: '',cin:'' ,numTlf:''}
  constructor(private userService:UserServiceService){}
  sex(user:User){
    console.log(user.sexe);

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
    this.userService.updateUser(user,19).subscribe((res:any)=>{
      console.log(res);
      location.reload()
    },(error:any)=>{
      console.log(error);
    }
    )
  }



  ngOnInit(): void {
    this.getUserById()
  }




}
