import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { NgxSpinnerService } from '../../../../../node_modules/ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private _auth: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  submit(form: NgForm){
    let username: string = form.value.username;
    let password: string = form.value.password;
    let returnUrl: string;
    this.spinner.show();
    this._auth.login(username, password).subscribe(user => {
      if(user) {
        returnUrl = localStorage.getItem("returnUrl");
        this.spinner.hide();
        this.router.navigate([returnUrl]);
      }
      form.control.setErrors({'invalidlogin':true});
      this.spinner.hide();
    });
  }

}
