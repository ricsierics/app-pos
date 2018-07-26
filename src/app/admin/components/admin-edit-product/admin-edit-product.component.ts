import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormGroup } from '@angular/forms';

declare var $: any;

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
  
  constructor(private _service: ProductService) { }

  ngOnInit() {
    this.modalId = "modalReactiveEditMode" + this.model.id;
  }

  onShowModal(){
    $('#' + this.modalId).modal('show');
  }

  onEdit(f: FormGroup){
    this._service.edit(f.value).subscribe(
      () => {
        $('.close').click();
        this.onEditEmitter.emit();
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
