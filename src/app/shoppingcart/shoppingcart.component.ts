import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { CartService } from '../_services/cart.service';
import {Cart} from '../models/cart';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { Item } from '../models/item';
import { ShoppingCartUpdate } from '../models/shoppingCartUpdate';
@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
//  cart = this.cartService.getCart();
  // countCart: Cart[];
  //books:Book[];
  //countCart[bookId];
  
  user: User;
  cart: Cart;
  items: Item[];
  books: Book[];
  params: ShoppingCartUpdate;
  constructor(private cartService: CartService, private accountService: AccountService) {
    this.params = new ShoppingCartUpdate();
   }

  ngOnInit(): void {
    this.loadCart();
    
    // console.log( countCart[bookId]);
  }

  loadCart() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
    this.cartService.getCart(this.user.id).subscribe(response => {
      this.cart = response;
      this.items = response.items;
    })
  }

  removeCartItem(cartId: number, itemId: number) {
  
    this.cartService.removeCartItem(cartId, itemId).subscribe(response => {
      window.location.href = '/shoppingcart';
      console.log(response);
    })
  }

  changeQuantity(cartId: number, cartItem: number, quantity: number) {
    this.params.cartId = cartId;
    this.params.cartItemId = cartItem;
    this.params.quantity = quantity;
    this.cartService.changeQuantity(this.params).subscribe(response => {
      window.location.href = '/shoppingcart';
      console.log(response);
    })
  }

  // addToCart(accountId: number, book: Book) {
  //   this.bookIds.push(book);
  //   this.cartService.addToCart(accountId, this.bookIds).subscribe(response => {
  //     window.location.href = '/shoppingcart';
  //     console.log(response);
  //   })
  // }


  



}
