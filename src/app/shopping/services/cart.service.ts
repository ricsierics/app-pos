import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';
import { GroupedItem } from '../../shared/models/GroupedItem';
import { Observable, timer, of, observable, from, concat } from '../../../../node_modules/rxjs';
//import { concat } from 'rxjs/operators';
//import { of } from 'rxjs/observable/of';
import {take, concatAll, skip} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;
  //products: Product[];  //Will comment it might be unused

  constructor(private _productService: ProductService) {
    this.cart = new Cart;

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
     let groupedItems: GroupedItem[] = [];
     this.cart.items.forEach(element => {
       groupedItems.push(element);
     });

     let observables: Observable<Product>[];
     groupedItems.forEach(groupedItem => {
      observables.push(this._productService.decrementStock(groupedItem.items[0].id, groupedItem.subQuantity));
     });


    // concatAll();

    // observables.forEach(element => 
    //   element.pipe(concat(of(1,2,3)))
    // );



     const source1 = of(1,2,3);
     const source2 = of(4,5,6);
     //const example = source1.pipe(concat(source2));
     const example = concat(source1, source2, source1);
     const subscribe = example.subscribe(val => console.log('Example: ', val));
   }

   private getGroupedItems(productId: number): GroupedItem{
    return this.cart.items.get(productId);
   }
}

