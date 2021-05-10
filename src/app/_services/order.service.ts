import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { ShoppingCartParam } from '../models/shoppingcartParam';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { ShoppingCartUpdate } from '../models/shoppingCartUpdate';
import { OrderRecipts } from '../models/orderRecipts';
import { DeliveryMethod } from '../models/deliveryMethod';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cart: Cart[] = [];

  baseUrl = environment.apiUrl;
  constructor(private Http: HttpClient) { }
  getCart(id: number) {
    return this.Http.get<Cart>(this.baseUrl + "shoppingcart/" + id).pipe(
      map(response => {
        return response;
      }))
  }

  getDeliveryMethods() {
    return this.Http.get<DeliveryMethod[]>(this.baseUrl + "OrderReceipt/delivery").pipe(
      map(response => {
        return response;
      })
    )
  }

  createOrder(model: any) {
    return this.Http.post<OrderRecipts>(this.baseUrl + "OrderReceipt/", model).pipe(
      map(response => {
        return response;
      })
    )
  }

  getOrders() {
    return this.Http.get<OrderRecipts[]>(this.baseUrl+'OrderReceipt/').pipe(
      map(res => {
        return res;
      })
    )
  }

  payment(orderId: number) {
    const paymentInput= {
      orderId: orderId
    }
    return this.Http.post(this.baseUrl + 'OrderReceipt/payment', paymentInput).pipe(
      map(res => {
        return res;
      })
    );
  }
}
