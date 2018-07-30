import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    ProductsComponent,
    HomeComponent,
    ShoppingCartComponent
  ]
})
export class ShoppingModule { }
