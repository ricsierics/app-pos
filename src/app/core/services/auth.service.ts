import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import { User } from 'shared/models/User';

/* Mock credentials:
   Username   Password    Role
-------------------------------
1. admin      password    admin
2. user       password    user
*/

const adminUsername = "admin";
const adminPassword = "password";
const userUsername = "user"
const userPassword = "password";
const returnUrlKey = "returnUrl";
const sessionIdKey = "sessionId";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;

  constructor(private route: ActivatedRoute) {}

  login(username: string, password: string): Observable<User>{
    let returnUrlValue = this.route.snapshot.queryParamMap.get(returnUrlKey) || "/";
    localStorage.setItem(returnUrlKey, returnUrlValue);

    this.getUserByCredentials(username, password);
    if(!this.user)
      return of(null).pipe(delay(1200));
    if(this.user.isAdmin)
      localStorage.setItem(sessionIdKey, "session-admin");
    else
      localStorage.setItem(sessionIdKey, "session-user");
    return of(this.user).pipe(delay(1200));
  }

  getCurrentUser(): Observable<User>{
    this.getUserBySessionId(localStorage.getItem(sessionIdKey));
    return of(this.user);
  }

  isAuthenticated(): Observable<boolean>{
    let sessionId = localStorage.getItem(sessionIdKey);
    if(sessionId) return of(true);
    return of(false);
  }

  logout(): Observable<boolean>{
    localStorage.removeItem(sessionIdKey);
    return of(true).pipe(delay(1200));
  }

  private getUserByCredentials(username: string, password: string){
    if(username == adminUsername && password == adminPassword){
      this.user = new User();
      this.user.username = username;
      this.user.isAdmin = true;
    } else if(username == userUsername && password == userPassword){
      this.user = new User();
      this.user.username = username;
      this.user.isAdmin = false;
    } else {
      this.user = null;
    }
  }

  private getUserBySessionId(sessionId: string){
    if(!sessionId)
      this.user = null;
    else if(sessionId == "session-admin"){
      this.user = new User();
      this.user.username = adminUsername;
      this.user.isAdmin = true;
    } else {
      this.user = new User();
      this.user.username = userUsername;
      this.user.isAdmin = false;
    }
  }
}
