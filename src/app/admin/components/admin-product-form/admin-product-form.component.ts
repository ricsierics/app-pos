import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product } from 'shared/models/Product';

declare var $: any;

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  form: FormGroup;
  @Input() model: Product;
  @Output() onBtnPrimaryClickEventEmitter = new EventEmitter();
  @Input() modalId: string;
  @Input() formTitle: string;
  @Input() btnPrimaryLabel: string;
  @Input() isEditMode: boolean;

  constructor(private fb: FormBuilder) { 
    this.model = new Product();
    this.createForm();
  }

  ngOnInit() {
    this.bindModelToForm();
  }

  createForm(){
    this.form = this.fb.group({
      id: [this.model.id],
      code: [this.model.code],
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      stockQty: ['', [Validators.required]],
      uom: ['', [Validators.required]],
      expiration: ['', [Validators.required]]
    });
  }

  onBtnPrimaryClick(){
    this.bindFormToModel();
    this.onBtnPrimaryClickEventEmitter.emit(this.model);
  }

  bindModelToForm(){
    this.id.setValue(this.model.id);
    this.code.setValue(this.model.code);
    this.name.setValue(this.model.name);
    this.description.setValue(this.model.description);
    this.price.setValue(this.model.price);
    this.stockQty.setValue(this.model.stockQty);
    this.uom.setValue(this.model.uom);
    this.expiration.setValue(this.model.expiration);
  }

  bindFormToModel(){  
    this.model.id = this.id.value;
    this.model.code = this.code.value;
    this.model.name = this.name.value;
    this.model.description = this.description.value;
    this.model.price = Number(this.price.value);
    this.model.stockQty = Number(this.stockQty.value);
    this.model.uom = this.uom.value;
    this.model.expiration = this.expiration.value;
  }
  
  resetForm(){
    this.form.reset();
  }

  showForm(){
    $('#' + this.modalId).modal('show');
  }

  closeForm(){
    $('.close').click();
  }

  get id(){
    return this.form.get('id');
  }

  get code(){
    return this.form.get('code');
  }

  get name(){
    return this.form.get('name');
  }

  get description(){
    return this.form.get('description');
  }

  get price(){
    return this.form.get('price');
  }

  get stockQty(){
    return this.form.get('stockQty');
  }

  get uom(){
    return this.form.get('uom');
  }

  get expiration(){
    return this.form.get('expiration');
  }
}
