import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';
//import { HomeComponent } from './shopping/components/home/home.component';
//import { AuthGuard } from './core/services/auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner'
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './core/services/auth-guard.service';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    NgxSpinnerModule,
    AppRoutingModule
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent, canActivate: [AuthGuard] }
    // ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
