import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Order } from 'shared/models/Order';
import { Cart } from 'shared/models/Cart';
import { CartService } from 'shopping/services/cart.service';

declare var $: any;

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Output() onSubmitEmitter = new EventEmitter();
  cart: Cart;
  order: Order;

  constructor(private cartService: CartService) { 
    //this.order = new Order();
  }

  ngOnInit() {
    this.order = new Order();
  }

  show(){
    this.bindCartToOrder();
    $('#summaryModal').modal('show');
  }

  dismiss(){
    $('.close').click();
  }

  bindCartToOrder(){
    this.cart = this.cartService.getCart();
    this.order.items = this.cartService.getGroupedItems();
    this.order.totalCount = this.cart.totalItems;
    this.order.totalAmount = this.cart.totalPrice;
    this.order.paymentMethod = "Cash on delivery";
    this.order.user = this.cart.user;
    let dateString = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.order.orderDate = new Date(dateString);
  }

  computeChange(){
    this.order.changeAmount =  this.order.paidAmount - this.order.totalAmount;
  }

  isChangeValid(): boolean{
    return this.order.changeAmount >= 0;
  }

  submit(){
    this.onSubmitEmitter.emit(this.order);
    console.log("Order:");
    console.log(this.order);
  }
}
