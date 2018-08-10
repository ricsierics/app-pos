import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { OrderService } from 'shared/services/order.service';
import { AlertBoxComponent } from 'shared/components/alert-box/alert-box.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AlertBoxComponent) modalComponent: AlertBoxComponent;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'totalCount', 'totalAmount', 'paidAmount', 'changeAmount', 'paymentMethod', 'orderDate', 'user' ];
  isLoaded = false;
  modalSubscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  ngOnDestroy(){
    if(this.modalSubscription)
      this.modalSubscription.unsubscribe();
  }

  private getOrders(){
    this.orderService.getOrders().subscribe(orders => {
      if(orders){
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isLoaded = true;
    },
    (error: any) => {
      this.isLoaded = true;
      this.modalComponent.showErrorGeneric();
      this.modalSubscription = this.modalComponent.onBtnPrimaryEmitter.subscribe(() => this.modalComponent.dismiss());
      console.log(error);
    });
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
