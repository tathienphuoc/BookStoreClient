import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { CartService } from '../_services/cart.service';
import { Cart } from '../models/cart';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { Item } from '../models/item';
import { ShoppingCartUpdate } from '../models/shoppingCartUpdate';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {



  user: User;
  cart: Cart;
  items: Item[];
  books: Book[];

  params: ShoppingCartUpdate;
  constructor(private cartService: CartService, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      console.log(user);

    });
    this.params = new ShoppingCartUpdate();
  }

  ngOnInit(): void {
    this.loadCart();
    this.loadUser();

    // console.log( countCart[bookId]);
  }

  loadCart() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      console.log(user);

    })
    this.cartService.getCart(this.user.id).subscribe(response => {
      this.cart = response;
      this.items = response.items;
    })
  }
  loadUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })

    this.accountService.getUser(this.user.id).subscribe(respone => {
      this.user = respone;
    })

  }


  getTotal() {
    let total = 0;
    for (let i = 0; i < this.cart.items.length; i++) {
      let cart = this.cart.items[i];
      total += cart.quantity * cart.totalPrice

    }
    return total;
  }

}
