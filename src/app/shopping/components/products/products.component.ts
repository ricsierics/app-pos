import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/Product';
import { CartService } from '../../services/cart.service';
import { GroupedItem } from '../../../shared/models/GroupedItem';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  
  constructor(private _productService: ProductService, private _cartService: CartService) { }

  ngOnInit() {
    this.getProducts();
  }

  //Warning: duplicate code in admin-products.component.ts
  getProducts(){
    this._productService.getAll().subscribe(
      (values) => { this.products = values },
      (error: any) => {
        if(error.error instanceof Error){
          console.log('Client-side error occured');
        } else {
          console.log('Server-side error occured');
        }
      });
  }

  onSelect(selectedProduct: Product){
    console.log("Product selected:");
    console.log(selectedProduct);
    
    // this._productService.decrementStock(product.id, 1).subscribe(() => {
    //   console.log("inside decrementStock subscription");
    //   this._productService.getAll().subscribe((result) => {
    //     this.products = result;
    //     this._cartService.addToCart(product);
    //   });      
    // });

    //update product stock
    let product = this.products.filter(x => x.id == selectedProduct.id)[0];
    if(product.stockQty == 0)
      return;
    product.stockQty -= 1;
    //add product to cart
    this._cartService.addToCart(selectedProduct);
  }

  onDeselect(selectedProduct: Product){
    //update product stock
    let product = this.products.filter(x => x.id == selectedProduct.id)[0];
    product.stockQty += 1;
    //add product to cart
    this._cartService.removeFromCart(selectedProduct);
  }

  onDeselectAll(groupedItems: GroupedItem[]){
    groupedItems.forEach(groupedItem => {
      let product = this.products.filter(x => x.id == groupedItem.items[0].id)[0];
      product.stockQty += groupedItem.subQuantity;
      this._cartService.removeAllFromCart();
    });
  }
}
