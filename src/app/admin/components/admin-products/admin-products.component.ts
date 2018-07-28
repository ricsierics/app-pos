import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private _service: ProductService) { }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this._service.getAll().subscribe(
      (values) => { this.products = values },
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
    this._service.delete(selectedProduct.id).subscribe(
      () => { this.products = this.products.filter(c => c !== selectedProduct); },
      (error: any) => {
        if(error.error instanceof Error){
          console.log('Client-side error occured');
        } else {
          console.log('Server-side error occured');
        }
      });
  }
}
