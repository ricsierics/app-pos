import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service'
import { ProductService } from './services/product.service';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AlertBoxComponent
  ],
  providers:[
    ProductService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AlertBoxComponent
  ]
})
export class SharedModule { }
