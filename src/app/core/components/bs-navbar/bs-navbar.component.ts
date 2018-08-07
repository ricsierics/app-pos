import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from 'core/services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private _auth: AuthService, private router: Router, private spinner: NgxSpinnerService) {}

  getCurrentUser(){
    return this._auth.getCurrentUser();
  }

  logout(){
    this.spinner.show();
    this._auth.logout().subscribe(result => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    });
  }
}
