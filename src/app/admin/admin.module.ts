import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrdersComponent } from 'admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'admin/components/admin-products/admin-products.component';
import { AdminProductFormComponent } from 'admin/components/admin-product-form/admin-product-form.component';
import { AdminAddProductComponent } from 'admin/components/admin-add-product/admin-add-product.component';
import { SharedModule } from 'shared/shared.module';
import { AdminEditProductComponent } from 'admin/components/admin-edit-product/admin-edit-product.component';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard.service';
import { AdminRoutingModule } from 'admin/admin-routing.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminOrdersComponent, 
    AdminProductsComponent, 
    AdminProductFormComponent,
    AdminAddProductComponent,
    AdminEditProductComponent
  ],
  providers:[
    AdminAuthGuard
  ]
})
export class AdminModule { }
