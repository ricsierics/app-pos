import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from 'shopping/components/products/products.component';
import { HomeComponent } from 'shopping/components/home/home.component';
import { ShoppingCartComponent } from 'shopping/components/shopping-cart/shopping-cart.component';
import { SharedModule } from 'shared/shared.module';
import { OrderSummaryComponent } from 'shopping/components/order-summary/order-summary.component';
import { MyOrdersComponent } from 'shopping/components/my-orders/my-orders.component';
import { ShoppingRoutingModule } from 'shopping/shopping-routing.module';

//import { RouterModule } from '@angular/router';
//import { AuthGuard } from 'core/services/auth-guard.service';

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
