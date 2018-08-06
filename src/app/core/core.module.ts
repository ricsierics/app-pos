import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
//import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
    // RouterModule.forChild([
    //   { path: 'login', component: LoginComponent }
    // ])
  ],
  exports: [
    BsNavbarComponent
  ],
  declarations: [
    LoginComponent, 
    BsNavbarComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CoreModule { }
