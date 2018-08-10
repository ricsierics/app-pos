import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Modal } from 'shared/models/Modal';

declare var $: any;

@Component({
  selector: 'alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {
  @Input() modal: Modal;
  @Output() onBtnPrimaryEmitter = new EventEmitter();

  sender: any;

  constructor() { 
    this.modal = new Modal("defaultId", "defaultTitle", "defaultBody", "defaultSecondary", "defaultPrimary");
  }

  ngOnInit() {
  }

  onBtnSecondary(){
    this.dismiss();
  }

  onBtnPrimary(){
    this.onBtnPrimaryEmitter.emit(this.sender);
  }

  dismiss(){
    $('#' + this.modal.id).modal('hide');
  }

  show(sender?: any){
    this.sender = sender;
    $('#' + this.modal.id).modal('show');
  }

  showErrorGeneric(){
    this.modal.secondaryText = "";
    this.modal.primaryText = "Close";
    this.modal.title = "Error";
    this.modal.body = "An error has occurred";
    this.show();
  }
}
