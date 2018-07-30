import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from '../../../../node_modules/rxjs';
import { AuthService } from '../../core/services/auth.service';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean>{
    return this.auth.getCurrentUser().pipe(
      map(user => user.isAdmin)
    );
  }
}
