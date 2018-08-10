import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'shopping/components/home/home.component';
import { AuthGuard } from 'core/services/auth-guard.service';
import { AdminModule } from 'admin/admin.module';
import { CoreModule } from 'core/core.module';
import { ShoppingModule } from 'shopping/shopping.module';
import { NotFoundModule } from 'not-found/not-found.module';

const routes: Routes = [
    { path: 'admin/orders', loadChildren:() => AdminModule },
    { path: 'admin/products', loadChildren:() => AdminModule },
    { path: 'login', loadChildren:() => CoreModule },
    { path: 'home', loadChildren:() => ShoppingModule },
    { path: 'my', loadChildren:() => ShoppingModule },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'not-found', loadChildren:() => NotFoundModule },
    { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled'
    })]
})

export class AppRoutingModule {}