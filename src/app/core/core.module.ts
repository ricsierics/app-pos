import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from 'core/components/login/login.component';
import { BsNavbarComponent } from 'core/components/bs-navbar/bs-navbar.component';
import { AuthGuard } from 'core/services/auth-guard.service';
import { AuthService } from 'core/services/auth.service';
import { SharedModule } from 'shared/shared.module';
import { CoreRoutingModule } from 'core/core-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
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
