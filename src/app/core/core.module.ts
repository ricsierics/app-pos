import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, BsNavbarComponent]
})
export class CoreModule { }
