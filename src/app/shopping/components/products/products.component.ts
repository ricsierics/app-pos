import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  
  constructor(private _productService: ProductService, private _cartService: CartService) { }

  ngOnInit() {
    this._productService.getAll().subscribe((result) => this.products = result);
  }

  onSelect(product: Product){
    console.log("Product selected:");
    console.log(product);
    
    
    this._productService.decrementStock(product.id, 1).subscribe(() => {
      console.log("inside decrementStock subscription");
      this._productService.getAll().subscribe((result) => {
        this.products = result;
        this._cartService.addToCart(product);
      });      
    });
  }
}
