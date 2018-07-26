import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;
  constructor() {
    this.cart = new Cart;

    console.log("Cart service initialized:");
    console.log(this.cart);
   }

   addToCart(product: Product){
    
    let groupedItems = this.cart.items.get(product.id);
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

   getCart(): Cart{
     return this.cart;
   }
}

