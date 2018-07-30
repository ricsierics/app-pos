import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { Cart } from 'src/app/shared/models/Cart';
import { CartService } from '../../services/cart.service';

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
    this.order = new Order();
  }

  ngOnInit() {
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
    this.order = new Order();
    this.order.items = this.cartService.getGroupedItems();
    this.order.totalCount = this.cart.totalItems;
    this.order.totalAmount = this.cart.totalPrice;
    this.order.paymentMethod = "Cash on delivery";
    this.order.user = this.cart.user;
    this.order.paidAmount = 0;
    this.order.changeAmount = this.order.totalAmount - this.order.paidAmount;
  }

  computeChange(){
    this.order.changeAmount =  this.order.paidAmount - this.order.totalAmount;
  }

  submit(){
    this.onSubmitEmitter.emit(this.order);
  }
}
