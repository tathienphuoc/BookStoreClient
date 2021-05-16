import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { CartService } from '../_services/cart.service';
import {Cart} from '../models/cart';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { Item } from '../models/item';
import { ShoppingCartUpdate } from '../models/shoppingCartUpdate';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
  constructor(private cartService: CartService, private accountService: AccountService,
              private toastr: ToastrService, private route: Router) {
    this.params = new ShoppingCartUpdate();
   }

  ngOnInit(): void {
    this.loadCart();
    
    // console.log( countCart[bookId]);
  }

  showPrice(book: Book){
    if(book.discount == 0) {
      return book.price;
    } else {
      return Number((book.price - book.price*book.discount).toFixed(1)); ;
    }
  }

  loadCart() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
    this.cartService.getCart(this.user.id).subscribe(response => {
      this.cart = response;
      this.items = response.items;
      console.log(this.items);
      
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

  orderLink() {
    if (this.items?.length == 0 || this.items?.length == undefined) {
      this.toastr.error("Mua hàng trươc khi thanh toán");
    } else {
      location.href="/checkout";
    }
  }

  showTotalPrice() {
    let total = 0;
    this.items?.forEach(element => {
      total = total + element.totalPrice;
    });
    return total;
  }

  deleteItem(name: string, id: number) {
    if(confirm("Are you sure to delete "+name)) {
      this.cartService.removeItemsInCart(id).subscribe(response =>{
        this.cart = response;
        this.items = response.items;
      }, error =>{
        console.log(error);
      })
    }
  }
  getSave(){
    let savedMoney = 0;
    this.items?.forEach(item => {
      savedMoney = savedMoney 
        + (item.totalPrice - item.quantity*item.unitPrice*item.book.discount);
        console.log(item.quantity);
    });
    return savedMoney;
  }

  showTotalAfterDiscount() {
    return this.showTotalPrice() - (this.showTotalPrice() - this.getSave());
  }
}
