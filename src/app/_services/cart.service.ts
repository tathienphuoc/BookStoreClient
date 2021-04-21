import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book';
import { ShoppingCartParam } from '../models/shoppingcartParam';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private Http: HttpClient) { }
  addToCart(accountId: number, books: Book[]) {
    let params = new ShoppingCartParam(accountId, books[0].id);
    console.log(params);
    return this.Http.post('http://localhost:5001/api/shoppingcart', params).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }
}
