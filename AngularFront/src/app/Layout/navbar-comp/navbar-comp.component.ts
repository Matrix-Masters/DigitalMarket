import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { Logout } from 'src/app/Store/state';

@Component({
  selector: 'app-navbar-comp',
  templateUrl: './navbar-comp.component.html',
  styleUrls: ['./navbar-comp.component.scss']
})
export class NavbarCompComponent {

  constructor(private router:Router, private store:Store,private KeyclocSc:KeycloakService){
  }

  logout(){
    this.store.dispatch([
      new Logout()
    ])
    this.KeyclocSc.logout();
    this.router.navigate(['/']);
  }
}
