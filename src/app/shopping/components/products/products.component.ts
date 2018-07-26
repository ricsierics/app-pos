import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  @Output() onSelectEmitter = new EventEmitter;

  constructor(private _service: ProductService) { }

  ngOnInit() {
    this._service.getAll().subscribe((result) => this.products = result);
  }

  onSelect(product: Product){
    console.log("Product selected:");
    console.log(product);
    this.onSelectEmitter.emit(product);

  }
}
