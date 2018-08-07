import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  isLoaded = false;

  constructor(private _service: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this._service.getAll().subscribe(
      (values) => { 
        this.products = values;
        this.isLoaded = true;
      },
      (error: any) => {
        if(error.error instanceof Error){
          console.log('Client-side error occured');
        } else {
          console.log('Server-side error occured');
        }
      });
  }

  addProduct(){
    this.getProducts();
  }

  onClickDeleteProduct(selectedProduct: Product){
    this.spinner.show();
    this._service.delete(selectedProduct.id).subscribe(
      () => { 
        this.products = this.products.filter(c => c !== selectedProduct);
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        if(error.error instanceof Error){
          console.log('Client-side error occured');
        } else {
          console.log('Server-side error occured');
        }
      });
  }
}
