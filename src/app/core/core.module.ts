import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [
    BsNavbarComponent
  ],
  declarations: [
    LoginComponent, 
    BsNavbarComponent
  ]
})
export class CoreModule { }
