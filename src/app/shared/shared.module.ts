import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
    MatTableModule, //for material table
    MatPaginatorModule, //for pagination of material table
    NoopAnimationsModule, //disable material animation
    MatSortModule, //for sorting of material table
    MatFormFieldModule, //for filtering of material table
    MatInputModule, //for filtering of material table
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
    CssLoaderComponent,
    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }
