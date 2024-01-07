import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/Model/User_Store';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { SetUser } from 'src/app/Store/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  user:User;
  constructor(private store:Store,public categoriesService : CategoryServiceService,private UserService:UserServiceService){
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
        }, 1000);
    }
  }

  categories:any;
  images = [
    {
      imageSrc:
        '../../../assets/ecommerce.jpg',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
      '../../../assets/livraison.jpg',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        '../../../assets/sales.jpg',
      imageAlt: 'person2',
    },
  ]

  ngOnInit():void {

  }
}
