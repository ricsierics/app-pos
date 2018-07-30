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
      localStorage.setItem("sessionId", "session-admin");
      this.user.username = username;
      this.user.isAdmin = true;
      return of(this.user);
    } else if(username == "user" && password == "password"){
      localStorage.setItem("sessionId", "session-user");
      this.user.username = username;
      this.user.isAdmin = false;
      return of(this.user);
    }
    return of(null);
  }

  getCurrentUser(): Observable<User>{
    let sessionId = localStorage.getItem("sessionId");
    if(sessionId) return of(this.user);
    return of(null);
  }

  isAuthenticated(): Observable<boolean>{
    let sessionId = localStorage.getItem("sessionId");
    if(sessionId) return of(true);
    return of(false);
  }

  logout(){
    localStorage.removeItem("sessionId");
    return of(true);
  }
}
