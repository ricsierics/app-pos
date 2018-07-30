import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): Observable<boolean>{
    if((username == "admin" && password == "password") ||
       (username == "user" && password == "password")){
      sessionStorage.setItem("sessionId", "session1");
      return of(true);
    }
    return of(false);
  }

  isAuthenticated(): Observable<boolean>{
    let sessionId = sessionStorage.getItem("sessionId");
    if(sessionId) return of(true);
    return of(false);
  }

  logout(){
    sessionStorage.removeItem("sessionId")
    return of(true);
  }
}
