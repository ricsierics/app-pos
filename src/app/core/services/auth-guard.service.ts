import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../../../node_modules/@angular/router';
import { AuthService } from './auth.service';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private router: Router) { }

  canActivate(){
    return this._auth.isAuthenticated().pipe(
      map(result => {
        if(result)
          return true;
        
        this.router.navigate(['login']);
        return false
      })
    );
  }

}