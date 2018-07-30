import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { GroupedItem } from '../../../shared/models/GroupedItem';
import { Modal } from 'src/app/shared/models/Modal';
import { AlertBoxComponent } from '../../../shared/components/alert-box/alert-box.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

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

  constructor(private _service: CartService) {
    this.modal = new Modal("shoppingCartModal", "Confirmation", "Are you sure?", "No", "Yes");
  }

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
    this._service.removeFromCart(product);
  }

  clearCart(isCheckOutMode?: boolean){
    let groupedItems: GroupedItem[] = [];
    this.cart.items.forEach(element =>
      groupedItems.push(element)
    );
    if(!isCheckOutMode)
      this.clearCartEmitter.emit(groupedItems);
    this._service.removeAllFromCart();
    this.cart = this._service.getCart();
  }

  checkOut(){
    console.log("CHECK OUT initialized...");
    this._service.checkOutCart().subscribe(
      result => {
        console.log("CHECK OUT done!");
        console.log(this.cart);
        this.clearCart(true);
        this.orderSummaryComponent.dismiss();
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
    else if(sender.id == "btnCheckOut")
      this.checkOut();
    this.modalComponent.dismiss();
  }

  hasCartItems(): boolean{
    return this.cart.items.size > 0;
  }
}
