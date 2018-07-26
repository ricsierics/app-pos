import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSelect(product: Product){
    
  }
}
