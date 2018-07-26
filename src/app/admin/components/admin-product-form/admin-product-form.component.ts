import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    this.onBtnPrimaryClickEventEmitter.emit(this.form);
  }

  bindModelToForm(){
    this.code.setValue(this.model.code);
    this.name.setValue(this.model.name);
    this.description.setValue(this.model.description);
    this.price.setValue(this.model.price);
    this.stockQty.setValue(this.model.stockQty);
    this.uom.setValue(this.model.uom);
    this.expiration.setValue(this.model.expiration);
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
