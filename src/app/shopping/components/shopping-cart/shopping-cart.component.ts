import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { GroupedItem } from '../../../shared/models/GroupedItem';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: Cart;
  @Output() addQuantityEmitter = new EventEmitter();
  @Output() deductQuantityEmitter = new EventEmitter();
  @Output() clearCartEmitter = new EventEmitter();

  constructor(private _service: CartService) { }

  ngOnInit() {
    this.cart = this._service.getCart();
  }

  getGroupedItems(): GroupedItem[] {
    let groupedItems = Array.from(this.cart.items.values());
    return groupedItems;
  }

  addQuantity(groupedItem: GroupedItem){
    let product = groupedItem.items[0];
    this.addQuantityEmitter.emit(product);
  }

  deductQuantity(groupedItem: GroupedItem){
    let product = groupedItem.items[0];
    this.deductQuantityEmitter.emit(product);
  }

  clearCart(){
    let groupedItems: GroupedItem[] = [];
    this.cart.items.forEach(element =>
      groupedItems.push(element)
    );
    this.clearCartEmitter.emit(groupedItems);
    this._service.removeAllFromCart();
    this.cart = this._service.getCart();
  }

  checkOut(){

  }
}
