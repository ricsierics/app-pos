import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this._auth.logout().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }
}
