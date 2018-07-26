import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { RouterModule } from '@angular/router';
import { AdminAddProductComponent } from './components/admin-add-product/admin-add-product.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminEditProductComponent } from './components/admin-edit-product/admin-edit-product.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'admin/products' , component: AdminProductsComponent }
    ])
  ],
  declarations: [
    AdminOrdersComponent, 
    AdminProductsComponent, 
    AdminProductFormComponent,
    AdminAddProductComponent,
    AdminEditProductComponent
  ]
})
export class AdminModule { }
