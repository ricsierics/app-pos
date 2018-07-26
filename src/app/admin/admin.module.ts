import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminOrdersComponent, AdminProductsComponent, AdminProductFormComponent]
})
export class AdminModule { }
