import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map} from 'rxjs/operators';

import { Cart } from 'shared/models/Cart';
import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';
import { GroupedItem } from 'shared/models/GroupedItem';
import { AuthService } from 'core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;

  constructor(private productService: ProductService, private authService: AuthService) {
    this.cart = new Cart;
    this.assignCartUser();

    console.log("Cart service initialized:");
    console.log(this.cart);
  }

  addToCart(product: Product, qty?: number){
    if(!qty)
      qty = 1;

    let groupedItems = this.getGroupedItemById(product.id);
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
    let groupedItems = this.getGroupedItemById(product.id);
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
    this.assignCartUser();
    return this.cart;
  }

  checkOutCart(){
    //update product stocks based on cart items
    //add orders based on cart items

    //Warning: Need to perform transaction scope

    //Warnig: Fat method, breakdown operations

    let groupedItems = this.getGroupedItems();

    let observables: Observable<Product>[] = [];
    groupedItems.forEach(groupedItem => {
      observables.push(this.productService.decrementStock(groupedItem.items[0].id, groupedItem.subQuantity));
    });

    return forkJoin(observables).pipe(
      map(x => groupedItems)
    );
  }

  getGroupedItems(): GroupedItem[]{
    let groupedItems: GroupedItem[] = [];
    this.cart.items.forEach(element => {
      groupedItems.push(element);
    });
    return groupedItems;
  }

  private getGroupedItemById(productId: number): GroupedItem{
    return this.cart.items.get(productId);
  }

  private assignCartUser(){
    this.authService.getCurrentUser().subscribe(
      user => this.cart.user = user
    );
  }
}

