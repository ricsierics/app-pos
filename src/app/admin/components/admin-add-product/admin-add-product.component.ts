import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';
import { FormGroup } from '../../../../../node_modules/@angular/forms';

declare var $: any;

@Component({
  selector: 'admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  @Output() onAddEmitter = new EventEmitter();
  newProduct: Product;
  formTitle = "Add Product";
  btnPrimaryLabel = "Add";
  modalId = "modalReactiveAddMode";
  isEditMode = false;

  constructor(private _productService: ProductService) {
    this.newProduct = new Product();
   }

  ngOnInit() {
  }

  onShowModal(){
    $('#' + this.modalId).modal('show');
  }

  onAdd(f: FormGroup){
    this.newProduct = f.value;
    this._productService.add(this.newProduct).subscribe(
      () => {
        this.onAddEmitter.emit(this.newProduct);
        this.newProduct = new Product();
        f.reset();
        $('.close').click();
      },
      (error: any) => {
        if (error.error instanceof Error){
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
}
