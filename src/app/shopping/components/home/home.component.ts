import { Component, ViewChild } from '@angular/core';

import { Product } from 'shared/models/Product';
import { ProductsComponent } from 'shopping/components/products/products.component';
import { GroupedItem } from 'shared/models/GroupedItem';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(ProductsComponent) productsComponent: ProductsComponent;

  constructor() { }

  addQuantity(product: Product){
    this.productsComponent.onSelect(product);
  }

  deductQuantity(product: Product){
    this.productsComponent.onDeductQuantity(product);
  }

  clearCart(groupedItems: GroupedItem[]){
    this.productsComponent.onClearCart(groupedItems);
  }
}
