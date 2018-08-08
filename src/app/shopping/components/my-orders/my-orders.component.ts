import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'core/services/auth.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'totalCount', 'totalAmount', 'paidAmount', 'changeAmount', 'paymentMethod', 'orderDate' ];

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.orderService.getOrdersByUsername(user.username).subscribe(orders => {
        if(orders)
        console.log(orders);
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
