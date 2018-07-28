import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(ProductsComponent) productsComponent: ProductsComponent;

  constructor() { }

  ngOnInit() {
  }

  onSelect(product: Product){
    
  }

  addQuantity(product: Product){
    this.productsComponent.onSelect(product);
  }

  deductQuantity(product: Product){
    this.productsComponent.onDeselect(product);
  }
}
