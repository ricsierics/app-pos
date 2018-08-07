import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';
import { AdminProductFormComponent } from 'admin/components/admin-product-form/admin-product-form.component';

@Component({
  selector: 'admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
  @Input() model: Product;
  modalId: string;
  formTitle = "Edit Product";
  btnPrimaryLabel = "Save";
  @Output() onEditEmitter = new EventEmitter;
  isEditMode = true;
  @ViewChild(AdminProductFormComponent) productForm: AdminProductFormComponent;
  
  constructor(private _service: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.modalId = "modalReactiveEditMode" + this.model.id;
  }

  onClickEdit(){
    this.productForm.showForm();
  }

  onSave(modifiedProduct: Product){
    this.spinner.show();
    this._service.edit(modifiedProduct).subscribe(
      () => {
        this.productForm.closeForm();
        this.onEditEmitter.emit();
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        if (error.error instanceof Error){
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
}
