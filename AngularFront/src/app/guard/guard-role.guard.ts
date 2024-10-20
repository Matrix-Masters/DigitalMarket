import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SecurityServiceService } from '../Service/security-service.service';
import { User } from '../Model/User_Store';

@Injectable({
	providedIn: 'root'
})
export class guardRoleGuard implements CanActivate {
	constructor(private store: Store, private router: Router,private SecurityServiceService:SecurityServiceService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {

		var isAuthorized = false;
		var user:User

		user = this.store.selectSnapshot(s=>s.AuthStore?.User);
		if(user?.role!=null){
			console.log(user);
			for (var compt in route.data['role']) {
				if (user?.role.includes(route.data['role'][compt])) {
				  isAuthorized = true;
				}
		  }
		}
		
		if(!isAuthorized){
			 if(this.SecurityServiceService.hasRoleIn(route.data['role'])){
				isAuthorized = true;
			}else{
				window.alert('SORRY YOU CAN NOT ACCESS THIS PAGE');
			}
		}
		return isAuthorized || false;
	}

}
