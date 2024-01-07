import { Component, OnInit } from '@angular/core';
import Aos from 'aos';
import { KeycloakService } from 'keycloak-angular';
import { SecurityServiceService } from './Service/security-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public userProfile:any;

  title = 'AngularFront';

  constructor(private keycloakService: KeycloakService,private SecurityServiceService:SecurityServiceService) {}

  ngOnInit() {
    Aos.init();
    this.SecurityServiceService.init();
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then( async profile=>{
        this.userProfile=profile.username;
      });
    }  
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  public logout() {
    this.keycloakService.logout();
  }

}
