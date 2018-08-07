import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from 'core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this._auth.isAuthenticated().pipe(
      map(result => {
        if(result)
          return true;
        
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false
      })
    );
  }

}
