import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submit(form){
    let username: string = form.value.username;
    let password: string = form.value.password
    this._auth.login(username, password).subscribe(isAuthenticated => {
      console.log(isAuthenticated);
      if(isAuthenticated)
        this.router.navigate(['/home']);
    });
  }

}
