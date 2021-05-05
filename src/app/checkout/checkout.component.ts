import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { CartService } from '../_services/cart.service';
import { Cart } from '../models/cart';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { Item } from '../models/item';
import { ShoppingCartUpdate } from '../models/shoppingCartUpdate';
// import { loadStripe } from '@stripe/stripe-js';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderCreate } from '../models/orderCreate';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {


  orderForm: FormGroup;
  user: User;
  cart: Cart;
  items: Item[] = [];
  books: Book[];
  constructor(private cartService: CartService, private accountService: AccountService,
    private fb: FormBuilder, private orderService: OrderService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }
  

  async ngOnInit() {
    // const stripe = await loadStripe('pk_test_51InEfmFUXuaVDPZFYcahVXD2oe1pQyOsVOFAvHvGOZunjYrxN8GRd2v2aNNxL5GvBMTEbbyIJG8iDTtkH01EfJ4n00LCzkuKTV');
    // this.loadCart();
    // this.loadUser();
    // this.initialForm();
  }

  initialForm() {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }

  createOrder() {
    let orderDto = new OrderCreate()
    orderDto.fullName = this.orderForm.get('fullName').value;
    orderDto.email = this.orderForm.get('email').value;
    orderDto.phone = this.orderForm.get('phone').value;
    orderDto.cardNumber = this.orderForm.get('cardNumber').value;
    orderDto.items = this.items;
    this.orderService.createOrder(orderDto).subscribe(response => {
      console.log(response);
    })
    location.href="books/"
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
