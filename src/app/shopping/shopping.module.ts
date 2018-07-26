import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent }
    ])
  ],
  declarations: [
    ProductsComponent,
    HomeComponent
  ]
})
export class ShoppingModule { }
