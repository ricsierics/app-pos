import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';
import { GroupedItem } from '../../shared/models/GroupedItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;
  products: Product[];

  constructor(private _productService: ProductService) {
    this.cart = new Cart;
    //this._productService.;

    console.log("Cart service initialized:");
    console.log(this.cart);
   }

   addToCart(product: Product, qty?: number){
     if(!qty)
      qty = 1;

    let groupedItems = this.getGroupedItems(product.id);
    if(groupedItems) {
      let newSubQty = groupedItems.items.push(product);
      groupedItems.subQuantity = newSubQty;
      groupedItems.subTotalPrice += product.price;
    } else {
      this.cart.items.set(product.id, {items: [product], subName: product.name, subPrice: product.price, subQuantity: 1, subTotalPrice: product.price});
    }

     this.cart.totalItems += 1;
     this.cart.totalPrice += product.price;

     console.log("Add to cart:");
     console.log(this.cart);

   }

   removeFromCart(product: Product){
    //let groupedItems = this.cart.items.get(product.id);
    let groupedItems = this.getGroupedItems(product.id);
    groupedItems.items.pop();
    groupedItems.subQuantity -= 1;
    groupedItems.subTotalPrice -= product.price;

    if (groupedItems.subQuantity == 0)
      this.cart.items.delete(product.id);

    this.cart.totalItems -= 1;
    this.cart.totalPrice -= product.price;
   }

   removeAllFromCart(){
     this.cart = new Cart();
   }

   getCart(): Cart{
     return this.cart;
   }

   private getGroupedItems(productId: number): GroupedItem{
    return this.cart.items.get(productId);
   }
}

