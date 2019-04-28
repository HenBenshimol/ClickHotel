import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Order} from '../shared/models/order.model';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }

  countOrders(): Observable<number> {
    return this.http.get<number>('/api/orders/count');
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order);
  }

  getOrder(order: Order): Observable<Order> {
    return this.http.get<Order>(`/api/order/${order._id}`);
  }

  editOrder(order: Order): Observable<any> {
    return this.http.put(`/api/order/${order._id}`, order, { responseType: 'text' });
  }

  deleteOrder(order: Order): Observable<any> {
    return this.http.delete(`/api/order/${order._id}`, { responseType: 'text' });
  }

}