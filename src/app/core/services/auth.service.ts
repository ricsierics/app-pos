import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: ActivatedRoute) { }

  login(username: string, password: string): Observable<boolean>{
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

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
