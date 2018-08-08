import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

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

export class ShoppingCartComponent implements OnInit, OnDestroy {
  @Output() addQuantityEmitter = new EventEmitter();
  @Output() deductQuantityEmitter = new EventEmitter();
  @Output() clearCartEmitter = new EventEmitter();
  @ViewChild(AlertBoxComponent) modalComponent: AlertBoxComponent;
  @ViewChild(OrderSummaryComponent) orderSummaryComponent: OrderSummaryComponent;

  cart: Cart;
  modal: Modal;
  clearCartSubscription: Subscription;
  checkOutSubscription: Subscription;

  constructor(private cartService: CartService, private orderService: OrderService, private spinnerService: NgxSpinnerService) {
    this.modal = new Modal("shoppingCartModal", "Confirmation", "Are you sure?", "No", "Yes");
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  ngOnDestroy() {
    if(this.clearCartSubscription)
      this.clearCartSubscription.unsubscribe();
    if(this.checkOutSubscription)
      this.checkOutSubscription.unsubscribe();
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

  //WARNING: Nested subscription / fat method
  clearCart(isCheckOutMode?: boolean){
    this.modal.body = `Are you sure you want to clear ${this.cart.totalItems} item(s) in your cart?`;
    this.modalComponent.show();
    
    this.clearCartSubscription = this.modalComponent.onBtnPrimaryEmitter.subscribe(() => {
      this.modalComponent.dismiss();
      let groupedItems: GroupedItem[] = [];
      this.cart.items.forEach(element =>
        groupedItems.push(element)
      );
      if(!isCheckOutMode)
        this.clearCartEmitter.emit(groupedItems);
        this.cartService.removeAllFromCart();
        this.cart = this.cartService.getCart();
    });
  }

  //WARNING: Fat method / need transaction scope
  checkOut(order: Order){
    this.spinnerService.show();
    console.log("CHECK OUT initialized...");
    this.checkOutSubscription = this.cartService.checkOutCart().subscribe(
      result => {
        console.log("CHECK OUT done!");
        console.log(this.cart);

        this.orderService.addOrder(order).subscribe(() => {
          this.clearCart(true);
          this.orderSummaryComponent.dismiss();
          this.spinnerService.hide();

          this.modal.secondaryText = null;
          this.modal.primaryText = "Ok";
          this.modal.title = "Check Out successful!";
          this.modal.body = "Order Ref No.: XXX";
          this.modalComponent.show();

          this.orderSummaryComponent.ngOnInit();
        });
    });
  }

  showOrderSummary(){
    this.orderSummaryComponent.show();
  }

  hasCartItems(): boolean{
    return this.cart.items.size > 0;
  }
}
