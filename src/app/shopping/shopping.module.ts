import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
//import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
//import { AuthGuard } from '../core/services/auth-guard.service';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShoppingRoutingModule
    // RouterModule.forChild([
    //   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    //   { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] }
    // ])
  ],
  declarations: [
    ProductsComponent,
    HomeComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    MyOrdersComponent
  ]
})
export class ShoppingModule { }
