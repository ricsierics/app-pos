import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';
import { AdminProductFormComponent } from 'admin/components/admin-product-form/admin-product-form.component';
import { AlertBoxComponent } from 'shared/components/alert-box/alert-box.component';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit, OnDestroy {
  @Output() onAddEmitter = new EventEmitter();
  @ViewChild(AdminProductFormComponent) productForm: AdminProductFormComponent;
  @ViewChild(AlertBoxComponent) modalComponent: AlertBoxComponent;

  formTitle = "Add Product";
  btnPrimaryLabel = "Add";
  modalId = "modalReactiveAddMode";
  isEditMode = false;
  modalSubscription: Subscription;

  constructor(private productService: ProductService, private spinnerService: NgxSpinnerService) {
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.modalSubscription)
      this.modalSubscription.unsubscribe();
  }

  onClickAddProduct(){
    this.productForm.showForm();
  }

  onAdd(newProduct: Product){
    this.spinnerService.show();
    this.productService.add(newProduct).subscribe(
      () => {
        this.onAddEmitter.emit(newProduct);
        this.productForm.resetForm();
        this.productForm.closeForm();
        this.spinnerService.hide();
      },
      (error: any) => {
        this.spinnerService.hide();
        this.modalComponent.showErrorGeneric();
        this.modalSubscription = this.modalComponent.onBtnPrimaryEmitter.subscribe(() => this.modalComponent.dismiss());
        if (error.error instanceof Error){
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
}
