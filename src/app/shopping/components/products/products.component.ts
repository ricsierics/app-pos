import { Component, OnInit } from '@angular/core';

import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/Product';
import { GroupedItem } from 'shared/models/GroupedItem';
import { CartService } from 'shopping/services/cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoaded = false;
  
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.getProducts();
  }

  //Warning: duplicate code in admin-products.component.ts
  getProducts(){
    this.productService.getAllNotExpired().subscribe(
      (values) => {
        this.products = values;
        this.filteredProducts = this.products;
        this.isLoaded = true;
      },
      (error: any) => {
        this.isLoaded = true;
        if(error.error instanceof Error){
          console.log('Client-side error occured');
        } else {
          console.log('Server-side error occured');
        }
      });
  }

  onSelect(selectedProduct: Product){
    let product = this.filteredProducts.filter(x => x.id == selectedProduct.id)[0];
    if(product.stockQty == 0)
      return;
    product.stockQty -= 1;
    this.cartService.addToCart(selectedProduct);
  }

  onDeductQuantity(selectedProduct: Product){
    let product = this.filteredProducts.filter(x => x.id == selectedProduct.id)[0];
    product.stockQty += 1;
  }

  onClearCart(groupedItems: GroupedItem[]){
    groupedItems.forEach(groupedItem => {
      let product = this.filteredProducts.filter(x => x.id == groupedItem.items[0].id)[0];
      product.stockQty += groupedItem.subQuantity;
    });
  }

  onSearch(keyword: string){
    if(keyword.trim()){
      console.log(`Keyword: ${keyword}`);
      this.filteredProducts = this.products.filter(x => x.name.toLowerCase().includes(keyword.trim().toLowerCase()));
    } else
      this.filteredProducts = this.products;
  }
}
