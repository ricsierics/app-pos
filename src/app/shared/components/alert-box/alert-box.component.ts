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

  constructor() { }

  ngOnInit() {
  }

  onBtnSecondary(){
    this.dismiss();
  }

  onBtnPrimary(){
    this.onBtnPrimaryEmitter.emit(this.sender);
  }

  dismiss(){
    $('.close').click();
  }

  show(sender?: any){
    this.sender = sender;
    $('#' + this.modal.id).modal('show');
  }
}
