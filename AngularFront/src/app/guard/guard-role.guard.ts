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
		var user = this.store.selectSnapshot(s=>s.AuthStore?.User);
		
		for (var compt in route.data['role']) {
      	if (user['role'].includes(route.data['role'][compt])) {
        	isAuthorized = true;
      	}
		}
		if (!isAuthorized) {
			window.alert('SORRY YOU CAN NOT ACCESS THIS PAGE');
		}
		return isAuthorized || false;
	}

}
