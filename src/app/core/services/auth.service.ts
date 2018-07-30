import { Injectable } from '@angular/core';
import { of, Observable, empty } from 'rxjs';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new User();

  constructor(private route: ActivatedRoute) { }

  login(username: string, password: string): Observable<User>{
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    if(username == "admin" && password == "password"){
      sessionStorage.setItem("sessionId", "sessionAdmin");
      this.user.username = username;
      this.user.isAdmin = true;
      return of(this.user);
    } else if(username == "user" && password == "password"){
      sessionStorage.setItem("sessionId", "sessionUser");
      this.user.username = username;
      this.user.isAdmin = false;
      return of(this.user);
    }
    return of();
  }

  getCurrentUser(): Observable<User>{
    let sessionId = sessionStorage.getItem("sessionId");
    if(sessionId) return of(this.user);
    return of(null);
  }

  isAuthenticated(): Observable<boolean>{
    let sessionId = sessionStorage.getItem("sessionId");
    if(sessionId) return of(true);
    return of(false);
  }

  logout(){
    sessionStorage.removeItem("sessionId");
    return of(true);
  }
}
