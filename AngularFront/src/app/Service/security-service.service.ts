import {Injectable, OnInit} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import { Store } from "@ngxs/store";
import { SetIsAuth, SetUser } from "../Store/state";
import { User } from "../Model/User_Store";
import { UserServiceService } from "./user-service.service";

@Injectable({
  providedIn: 'root'
})

export class SecurityServiceService {

  public isLoggedin: boolean = false;
  public profile? : KeycloakProfile;

  constructor (public kcService: KeycloakService,private Store:Store,private userService:UserServiceService) {
    this.isLoggedin=this.Store.selectSnapshot(s=>s.AuthStore?.User) ? true : false;
    this.init();
  }

  init() {
       var user_store:any;
        this.kcService.keycloakEvents$.subscribe({
          next: (e)  => {
            if (e.type == KeycloakEventType.OnAuthSuccess)  {
              this.kcService.loadUserProfile().then((profile:any)=>{
                  this.userService.getUserByIdKeyCloak(profile.id).subscribe((user:any)=>{
                  user_store=new User(
                    profile.id,
                    profile.username,
                    user['user'].firstName,
                    user['user'].lastName,
                    profile.email,
                    profile.emailVerified,
                    profile.enabled,
                    profile.createdTimestamp,
                    profile.attributes,
                    user['user'].id,
                    user['user'].welcome_field,
                    user['user'].status,
                    user['user'].role,
                    user['user'].contract,
                    user['user'].sexe,
                    user['user'].numTlf,
                    user['user'].cin,
                    user['user'].photo
                   );
                   this.Store.dispatch([
                    new SetUser(
                      user_store
                    ),
                    new SetIsAuth(true),
                  ]);
                 },(err:any)=>{
                  user_store = new User(
                    profile.id,
                    profile.username,
                    profile.firstName,
                    profile.lastName,
                    profile.email,
                    profile.emailVerified,
                    profile.enabled,
                    profile.createdTimestamp,
                    profile.attributes,
                    null, 
                    null, 
                    null, 
                    null,
                    null, 
                    null,
                    null, 
                    null,
                    null 
                  );
                  this.Store.dispatch([
                    new SetUser(
                      user_store
                    ),
                    new SetIsAuth(true),
                  ]);
                 })
              });
            }
            console.log(user_store);
            this.isLoggedin=this.Store.selectSnapshot(s=>s.AuthStore?.User) ? true : false;
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
