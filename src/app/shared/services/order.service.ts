import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { Observable, of } from '../../../../node_modules/rxjs';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { tap, catchError } from '../../../../node_modules/rxjs/operators';

const inMemoryCollectionName = "orders";
const baseUrl = `api/${inMemoryCollectionName}`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http: HttpClient) { }

  addOrder(newOrder: Order){
    return this.http.post<Order>(baseUrl, newOrder, httpOptions).pipe(
      tap(addedOrder => { this.log("Added order:"); console.log(addedOrder) }),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(baseUrl).pipe(
      tap(result => { this.log("Fetched orders:");  console.log(result)}),
      catchError(this.handleError('getOrders', []))
    );
  }

  // getOrdersByUsername(userName: string){
  //  return this.http.get<Order>(`${baseUrl}/{}) 
  // }

  private log(message: string){
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result? : T){
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}