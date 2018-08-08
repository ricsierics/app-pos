import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';
import { AdminProductFormComponent } from 'admin/components/admin-product-form/admin-product-form.component';

@Component({
  selector: 'admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  @Output() onAddEmitter = new EventEmitter();
  formTitle = "Add Product";
  btnPrimaryLabel = "Add";
  modalId = "modalReactiveAddMode";
  isEditMode = false;
  @ViewChild(AdminProductFormComponent) productForm: AdminProductFormComponent;

  constructor(private productService: ProductService, private spinnerService: NgxSpinnerService) {
   }

  ngOnInit() {
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
        if (error.error instanceof Error){
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
}
