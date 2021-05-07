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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderCreate } from '../models/orderCreate';
import { OrderService } from '../_services/order.service';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import * as util from 'util' // has no default export
import { inspect } from 'util' // or directly



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderForm: FormGroup;
  user: User;
  cart: Cart;
  items: Item[] = [];
  books: Book[];
  constructor(private cartService: CartService, private accountService: AccountService,
    private fb: FormBuilder, private orderService: OrderService) {
    let u: User;
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      u = user;
      console.log("contructor",user);
    });
    this.user = u;
  }
  

  ngOnInit(): void {
    // const stripe = await loadStripe('pk_test_51InEfmFUXuaVDPZFYcahVXD2oe1pQyOsVOFAvHvGOZunjYrxN8GRd2v2aNNxL5GvBMTEbbyIJG8iDTtkH01EfJ4n00LCzkuKTV');
    this.loadCart();
    this.initialForm();
  }

  initialForm() {    
    this.orderForm = this.fb.group({
      fullName: [this.user.fullName, Validators.required],
      phone: [this.user.phoneNumber, Validators.required],
      email: [this.user.email, Validators.required],
      cardNumber: ['', Validators.required]
    });
  }
  showTotalPrice() {
    let total=0;
    this.items?.forEach(e=>{
      total = total + e.totalPrice;
    })
    return total;
  }

  createOrder() {
    // let orderDto = new OrderCreate()
    // orderDto.fullName = this.orderForm.get('fullName').value;
    // orderDto.email = this.orderForm.get('email').value;
    // orderDto.phone = this.orderForm.get('phone').value;
    // orderDto.cardNumber = this.orderForm.get('cardNumber').value;

    this.orderForm.addControl('items', this.fb.control(this.items));  
    console.log(this.orderForm.value);
    const formData = new FormData();
    formData.append('accountId', this.user.id.toString());
    formData.append('fullName', this.orderForm.get('fullName').value);
    formData.append('phone', this.orderForm.get('phone').value);
    formData.append('email', this.orderForm.get('email').value);
    formData.append('cardNumber', this.orderForm.get('cardNumber').value);
    for (const index in this.items) {
      // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
      formData.append(
        `items[${index}]`,
        this.items[index].id.toString()
      );
    }
    this.orderService.createOrder(formData).subscribe(response => {
      console.log(response);
    })
  }

  loadCart() {
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


  // getTotal() {
  //   let total = 0;
  //   for (let i = 0; i < this.cart.items.length; i++) {
  //     let cart = this.cart.items[i];
  //     total += cart.quantity * cart.totalPrice
  //   }
  //   return total;
  // }
}
