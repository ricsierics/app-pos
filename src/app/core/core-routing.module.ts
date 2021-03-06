import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'core/components/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class CoreRoutingModule {}