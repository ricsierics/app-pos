import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'shared/services/in-memory-data.service'
import { ProductService } from 'shared/services/product.service';
import { AlertBoxComponent } from 'shared/components/alert-box/alert-box.component';
import { CssLoaderComponent } from 'shared/components/css-loader/css-loader.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AlertBoxComponent,
    CssLoaderComponent
  ],
  providers:[
    ProductService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AlertBoxComponent,
    NgxSpinnerModule,
    CssLoaderComponent
  ]
})
export class SharedModule { }
