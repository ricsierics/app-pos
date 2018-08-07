import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { CartService } from 'shopping/services/cart.service';
import { Cart } from 'shared/models/Cart';
import { GroupedItem } from 'shared/models/GroupedItem';
import { Modal } from 'shared/models/Modal';
import { AlertBoxComponent } from 'shared/components/alert-box/alert-box.component';
import { OrderSummaryComponent } from 'shopping/components/order-summary/order-summary.component';
import { Order } from 'shared/models/Order';
import { OrderService } from 'shared/services/order.service';


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
  modal: Modal;
  @ViewChild(AlertBoxComponent) modalComponent: AlertBoxComponent;
  @ViewChild(OrderSummaryComponent) orderSummaryComponent: OrderSummaryComponent;

  constructor(private cartService: CartService, private orderService: OrderService, private spinner: NgxSpinnerService) {
    this.modal = new Modal("shoppingCartModal", "Confirmation", "Are you sure?", "No", "Yes");
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
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
    this.cartService.removeFromCart(product);
  }

  clearCart(isCheckOutMode?: boolean){
    let groupedItems: GroupedItem[] = [];
    this.cart.items.forEach(element =>
      groupedItems.push(element)
    );
    if(!isCheckOutMode)
      this.clearCartEmitter.emit(groupedItems);
    this.cartService.removeAllFromCart();
    this.cart = this.cartService.getCart();
  }

  checkOut(order: Order){
    this.spinner.show();
    console.log("CHECK OUT initialized...");
    this.cartService.checkOutCart().subscribe(
      result => {
        console.log("CHECK OUT done!");
        console.log(this.cart);

        this.orderService.addOrder(order).subscribe(() => {
          this.clearCart(true);
          this.orderSummaryComponent.dismiss();
          this.spinner.hide();
        });
    });
  }

  showConfirmation(sender :any){
    this.modalComponent.show(sender);
  }

  showOrderSummary(){
    this.orderSummaryComponent.show();
  }

  execute(sender: any){
    if(sender.id == "btnClear")
      this.clearCart();
    // else if(sender.id == "btnCheckOut")
    //   this.checkOut();
    this.modalComponent.dismiss();
  }

  hasCartItems(): boolean{
    return this.cart.items.size > 0;
  }
}
