import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from 'core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private authService: AuthService, private router: Router, private spinnerService: NgxSpinnerService) { }

  submit(form: NgForm){
    let username: string = form.value.username;
    let password: string = form.value.password;
    let returnUrl: string;
    this.spinnerService.show();
    this.authService.login(username, password).subscribe(user => {
      if(user) {
        returnUrl = localStorage.getItem("returnUrl");
        this.spinnerService.hide();
        this.router.navigate([returnUrl]);
      }
      form.control.setErrors({'invalidlogin':true});
      this.spinnerService.hide();
    });
  }

}
