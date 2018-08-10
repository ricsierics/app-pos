import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { Product } from 'shared/models/Product';
import { ProductService } from 'shared/services/product.service';
import { AdminProductFormComponent } from 'admin/components/admin-product-form/admin-product-form.component';
import { AlertBoxComponent } from 'shared/components/alert-box/alert-box.component';

@Component({
  selector: 'admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit, OnDestroy {
  @Input() model: Product;
  @Output() onEditEmitter = new EventEmitter;
  @ViewChild(AdminProductFormComponent) productForm: AdminProductFormComponent;
  @ViewChild(AlertBoxComponent) modalComponent: AlertBoxComponent;

  modalId: string;
  formTitle = "Edit Product";
  btnPrimaryLabel = "Save";
  isEditMode = true;
  modalSubscription: Subscription;
  
  constructor(private productService: ProductService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.modalId = "modalReactiveEditMode" + this.model.id;
  }

  ngOnDestroy(){
    if(this.modalSubscription)
      this.modalSubscription.unsubscribe();
  }

  onClickEdit(){
    this.productForm.showForm();
  }

  onSave(modifiedProduct: Product){
    this.spinnerService.show();
    this.productService.edit(modifiedProduct).subscribe(
      () => {
        this.productForm.closeForm();
        this.onEditEmitter.emit();
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
