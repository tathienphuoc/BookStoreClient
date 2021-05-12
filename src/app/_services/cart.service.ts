import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { ShoppingCartParam } from '../models/shoppingcartParam';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { ShoppingCartUpdate } from '../models/shoppingCartUpdate';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cart : Cart[] = [];
  baseUrl = environment.apiUrl;
  constructor(private Http: HttpClient) { }
  // getItems() {
  //   return this.Http.get<cart[]>(this.baseUrl).pipe(map(response => {
  //     return response;
  //   }))
  // }

  


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
  getCart(id: number) {
    return this.Http.get<Cart>(this.baseUrl + "shoppingcart/" +id).pipe(
      map(response => {
        return response;
      }))
  }

  removeCartItem(idCart:number,idItem : number) {
    return this.Http.delete<Cart>(this.baseUrl + "shoppingcart/" + idCart + "/" + idItem).pipe(
      map(response => {
        return response;
      }))
    
  }

  removeItemsInCart(idItem: number) {
    return this.Http.delete<Cart>(this.baseUrl + "shoppingcart/" + idItem).pipe(
      map(response => {
        return response;
      })
    )
  }

  changeQuantity(shoppingCartUpdate: ShoppingCartUpdate) {
    return this.Http.put(this.baseUrl + "shoppingcart/", shoppingCartUpdate);
  }

  
}
