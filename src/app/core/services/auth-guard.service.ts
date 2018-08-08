import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from 'core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.authService.isAuthenticated().pipe(
      map(result => {
        if(result)
          return true;
        
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false
      })
    );
  }

}
