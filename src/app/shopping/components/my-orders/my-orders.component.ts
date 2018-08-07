import { Component, OnInit, ViewChild } from '@angular/core';

import { OrderService } from 'shared/services/order.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

const TABLE_DATA = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
];

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  dataSource = new MatTableDataSource(TABLE_DATA);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol' ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
