import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, switchMap, delay, map } from 'rxjs/operators';

import { Product } from 'shared/models/Product';

const inMemoryCollectionName = "products";
const baseUrl: string = `api/${inMemoryCollectionName}`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this._http.get<Product[]>(baseUrl).pipe(
      tap(result => { this.log("Fetched products: "); console.log(result) }),
      catchError(this.handleError('getAll', [])),
      (delay(800))
    );
  }

  getAllNotExpired(): Observable<Product[]>{
    return this.getAll().pipe(
      map(orders => orders.filter(order => new Date(order.expiration) >= new Date()))
    );
  }

  getById(id: number): Observable<Product>{
    return this._http.get<Product>(`${baseUrl}/${id}`).pipe(
      tap(result => { this.log("Fetched product by id: "); console.log(result) }),
      catchError(this.handleError('getAll', null)),
      (delay(800))
    );
  }

  add(newProduct: Product): Observable<Product> {
    newProduct.code = Product.generateCode();
    return this._http.post<Product>(baseUrl, newProduct, httpOptions).pipe(
      tap((addedProduct: Product) => this.log(`added product w/ code = ${addedProduct.code}`)),
      catchError(this.handleError<Product>('add')),
      (delay(800))
    );
  }

  edit(existingProduct: Product): Observable<Product>{
    return this._http.put(baseUrl, existingProduct, httpOptions).pipe(
      tap(result => this.log(`edited product with id = ${existingProduct.id}`)),
      catchError(this.handleError<any>('edit')),
      (delay(800))
    );
  }
  
  delete(id: number): Observable<Product> {
    const url = `${baseUrl}/${id}`;
    return this._http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`Deleted product id = ${id}`)),
      catchError(this.handleError<any>('delete')),
      (delay(800))
    );
  }

  decrementStock(productId: number, decrementBy: number) {
    console.log("decrementStock triggered");
    
    return this.getById(productId).pipe(
      switchMap((result) => {
        result.stockQty -= decrementBy;
        console.log("decremented product:");
        console.log(result);
        return this.edit(result);
      }), 
      (delay(800))
    );
  }

  private log(message: string){
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result? : T){
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T).pipe(delay(800));
    }
  }
}