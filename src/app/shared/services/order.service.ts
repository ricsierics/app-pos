import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, delay, map } from 'rxjs/operators';

import { Order } from 'shared/models/Order';

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
      catchError(this.handleError<Order>('addOrder')),
      (delay(1000))
    );
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(baseUrl).pipe(
      tap(result => { this.log("Fetched orders:");  console.log(result)}),
      catchError(this.handleError('getOrders', [])),
      (delay(1000))
    );
  }

  getOrdersByUsername(userName: string){
    return this.getOrders().pipe(
      map(result => result.filter(x => x.user.username == userName)),
      catchError(this.handleError('getOrdersByUsername', []))
    );
  }

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