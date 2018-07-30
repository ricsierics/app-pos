import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';
import { GroupedItem } from '../../shared/models/GroupedItem';
import { Observable, forkJoin } from 'rxjs';
import { map} from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;

  constructor(private _productService: ProductService, private _authService: AuthService) {
    this.cart = new Cart;
    this._authService.getCurrentUser().subscribe(
      user => this.cart.user = user
    );

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

  checkOutCart(){
    //update product stocks based on cart items
    //add orders based on cart items

    let groupedItems: GroupedItem[] = [];
    this.cart.items.forEach(element => {
      groupedItems.push(element);
    });

    let observables: Observable<Product>[] = [];
    groupedItems.forEach(groupedItem => {
      observables.push(this._productService.decrementStock(groupedItem.items[0].id, groupedItem.subQuantity));
    });

    return forkJoin(observables).pipe(
      map(x => groupedItems)
    );
  }

  private getGroupedItems(productId: number): GroupedItem{
    return this.cart.items.get(productId);
  }
}

