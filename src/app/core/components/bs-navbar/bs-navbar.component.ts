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

  constructor(private authService: AuthService, private router: Router, private spinnerService: NgxSpinnerService) {}

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  logout(){
    this.spinnerService.show();
    this.authService.logout().subscribe(result => {
      this.spinnerService.hide();
      this.router.navigate(['/login']);
    });
  }
}
