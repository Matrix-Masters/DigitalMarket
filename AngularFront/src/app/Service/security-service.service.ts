import {Injectable, OnInit} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import { Store } from "@ngxs/store";
import { SetIsAuth, SetUser } from "../Store/state";
import { User } from "../Model/User_Store";

@Injectable({
  providedIn: 'root'
})

export class SecurityServiceService {

  public isLoggedin: boolean = false;
  public profile? : KeycloakProfile;

  constructor (public kcService: KeycloakService,private Store:Store) {
    this.isLoggedin=this.Store.selectSnapshot(s=>s.AuthStore?.User) ? true : false;
    this.init();
  }

  init(){
        this.kcService.keycloakEvents$.subscribe({
          next: (e) => {
            if (e.type == KeycloakEventType.OnAuthSuccess) {
              this.kcService.loadUserProfile().then((profile:any)=>{
                 console.log(profile);
                 var user_store =new User(
                  profile.id,
                  profile.username,
                  profile.firstName,
                  profile.lastName,
                  profile.email,
                  profile.emailVerified,
                  profile.enabled,
                  profile.createdTimestamp,
                  profile.attributes
                 );
                this.Store.dispatch([
                  new SetUser(
                    user_store
                  ),
                  new SetIsAuth(true),
                ]);
              });
            }
            this.isLoggedin=this.Store.selectSnapshot(s=>s.AuthStore?.User) ? true : false;
            //console.log(this.isLoggedin);
          },
          error : err => {
            console.log(err);
          }
      });
    }  

  public hasRoleIn(roles:string[]):boolean{
    let userRoles = this.kcService.getUserRoles();
    for(let role of roles){
      if (userRoles.includes(role)) return true;
    } return false;
  }

  public logout() {
    this.kcService.logout();
  }
  
}
