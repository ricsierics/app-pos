import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private _auth: AuthService, private router: Router) {}

  logout(){
    this._auth.logout().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }

  getCurrentUser(){
    return this._auth.getCurrentUser();
  }
}
