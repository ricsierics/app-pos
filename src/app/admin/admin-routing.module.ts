import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminProductsComponent } from 'admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from 'admin/components/admin-orders/admin-orders.component';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard.service';
import { AuthGuard } from 'core/services/auth-guard.service';

const routes: Routes = [
    { path: 'admin/products' , component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/orders' , component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class AdminRoutingModule {}