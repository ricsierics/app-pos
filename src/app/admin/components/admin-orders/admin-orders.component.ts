import { Component, OnInit } from '@angular/core';

import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/Order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  isLoaded = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders(){
    this.orderService.getOrders().subscribe(result => {
      this.orders = result;
      this.isLoaded = true;
    });
  }

}
