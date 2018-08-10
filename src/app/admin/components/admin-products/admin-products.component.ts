import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';
import { Modal } from 'shared/models/Modal';
import { AlertBoxComponent } from 'shared/components/alert-box/alert-box.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild(AlertBoxComponent) modalComponent: AlertBoxComponent;

  products: Product[] = [];
  isLoaded = false;
  modal: Modal;
  deleteProductSubscription: Subscription;
  
  constructor(private productService: ProductService, private spinnerService: NgxSpinnerService) { 
    this.modal = new Modal("adminProductsModal", "Confirmation", "Are you sure?", "No", "Yes");
  }

  ngOnInit(){
    this.getProducts();
  }

  ngOnDestroy(){
    if(this.deleteProductSubscription)
      this.deleteProductSubscription.unsubscribe();
  }

  getProducts(){
    this.productService.getAll().subscribe(
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

  //Warning: Nested subscribe / fat method
  onDeleteProduct(selectedProduct: Product){
    this.modal.body = this.modal.body.replace("?", ` you want to delete ${selectedProduct.name}?`);
    this.modalComponent.show();

    this.deleteProductSubscription = this.modalComponent.onBtnPrimaryEmitter.subscribe(() => {
      this.modalComponent.dismiss();
      this.spinnerService.show();
      this.productService.delete(selectedProduct.id).subscribe(
        () => { 
          this.products = this.products.filter(c => c !== selectedProduct);
          this.spinnerService.hide();
        },
        (error: any) => {
          this.spinnerService.hide();
          this.modalComponent.showErrorGeneric();
          if(error.error instanceof Error){
            console.log('Client-side error occurred');
          } else {
            console.log('Server-side error occurred');
          }
        });
    });
  }

  isExpired(dateString: string): boolean{
    if(dateString){
      return new Date(dateString) < new Date();
    }
    return true;
  }
}
