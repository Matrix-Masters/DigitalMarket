import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/Model/User_Store';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { SetUser } from 'src/app/Store/state';

@Component({
  selector: 'app-fournisseur-interface',
  templateUrl: './fournisseur-interface.component.html',
  styleUrls: ['./fournisseur-interface.component.scss']
})
export class FournisseurInterfaceComponent {
    user:User;

    constructor(private store:Store,private UserService:UserServiceService) { 
      this.user=this.store.selectSnapshot(s=>s.AuthStore?.User);
      this.greeting();
    }

    greeting(){
      if(this.user?.welcome_field!=1){
        console.log("welcome "+this.user?.firstName);
          let test=new SpeechSynthesisUtterance("welcome "+this.user?.firstName);
          speechSynthesis.speak(test);
          setTimeout(() => {
            this.UserService.updateWelcome(this.user?.email).subscribe((res:any)=>{
                this.UserService.getUserById(this.user?.iduser).subscribe((data:any)=>{
                      this.store.dispatch(
                          new SetUser(data)
                      );
                 })
              },(err:any)=>{
                console.log(err);
              });
          }, 2000);
      }
    }


}
