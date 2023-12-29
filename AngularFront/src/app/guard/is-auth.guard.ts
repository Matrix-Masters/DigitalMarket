import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SecurityServiceService } from '../Service/security-service.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private router: Router,private SecurityServiceService:SecurityServiceService,
    private keycloakService: KeycloakService,) {
      this.SecurityServiceService.init();
    }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.SecurityServiceService.isLoggedin==true) {
      return true; 
    } else {
      this.keycloakService.login({
        redirectUri: window.location.origin
      });
      return false;
    }
  }
}