import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class guardRoleGuard implements CanActivate {
	constructor(private store: Store, private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {

		var isAuthorized = false;
		var authStore = this.store.selectSnapshot(state => state.AuthStore);
		
		for (var compt in route.data['role']) {
      if (authStore.user.role.includes(route.data['role'][compt])) {
        isAuthorized = true;
      }
		}
		if (!isAuthorized) {
			window.alert('you are not authorized');
		}
		return isAuthorized || false;
	}

}
