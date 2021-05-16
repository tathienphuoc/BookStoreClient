import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Book } from "../models/book";
import { CartService } from "../_services/cart.service";
import { Cart } from "../models/cart";
import { AccountService } from "../_services/account.service";
import { take } from "rxjs/operators";
import { User } from "../models/user";
import { Item } from "../models/item";
import { ShoppingCartUpdate } from "../models/shoppingCartUpdate";
// import { loadStripe } from '@stripe/stripe-js';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  Validators,
} from "@angular/forms";
import { OrderCreate } from "../models/orderCreate";
import { OrderService } from "../_services/order.service";
import { Observable } from "rxjs";
import { stringify } from "@angular/compiler/src/util";
import * as util from "util"; // has no default export
import { inspect } from "util"; // or directly
import { environment } from "src/environments/environment";
import { OrderRecipts } from "../models/orderRecipts";
import { Router } from "@angular/router";
import { DeliveryMethod } from "../models/deliveryMethod";
import { ToastrService } from "ngx-toastr";

declare var Stripe;
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  @ViewChild("cardNumber") cardNumberElement: ElementRef;
  @ViewChild("cardExpiry") cardExpiryElement: ElementRef;
  @ViewChild("cardCvc") cardCvcElement: ElementRef;

  order: OrderRecipts;
  cardError: any = null;

  private stripe: any;
  private cardNumber: any;
  private cardHandler = this.onChange.bind(this);

  numberCompleted = false;
  expiryCompleted = false;
  cvcCompleted = false;

  processing = false;
  orderForm: FormGroup;
  user: User;
  cart: Cart;
  items: Item[] = [];
  books: Book[];
  deliveryMethod: DeliveryMethod[];
  deliveryId: number;
  validationErrors: string[] = [];

  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let u: User;
    accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      u = user;
      console.log("contructor", user);
    });
    this.user = u;
  }

  ngAfterViewInit(): void {
    this.stripe = Stripe(environment.publishableKey);

    const elements = this.stripe.elements();

    this.cardNumber = elements.create("cardNumber", {
      showIcon: true,
      placeholder: "Card Number"
    });
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener("change", this.cardHandler);

    const cardExpiry = elements.create("cardExpiry");
    cardExpiry.mount(this.cardExpiryElement.nativeElement);
    cardExpiry.addEventListener("change", this.cardHandler);

    const cardCvc = elements.create("cardCvc");
    cardCvc.mount(this.cardCvcElement.nativeElement);
    cardCvc.addEventListener("change", this.cardHandler);
  }

  ngOnInit() {
    this.loadCart();
    this.initialForm();
    this.loadDeliveryMethods();
  }
  loadDeliveryMethods() {
    this.orderService.getDeliveryMethods().subscribe(response => {
      this.deliveryMethod = response;
    })
  }

  get cardInfoInvalid() {
    return !(this.numberCompleted && this.expiryCompleted && this.cvcCompleted);
  }

  onChange(event) {
    this.cardError = event.error?.message;

    switch (event.elementType) {
      case "cardNumber":
        this.numberCompleted = event.complete;
        break;
      case "cardExpiry":
        this.expiryCompleted = event.complete;
        break;
      case "cardCvc":
        this.cvcCompleted = event.complete;
        break;
    }
  }

  initialForm() {
    this.orderForm = this.fb.group({
      fullName: [this.user.fullName, Validators.required],
      phone: [this.user.phoneNumber, [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: [this.user.email, [Validators.required, Validators.email]],
      nameOnCard: ['', [Validators.required]]
    });
  }
  showTotalPrice() {    
    let total = 0;
    this.items?.forEach((e) => {
      total = total + e.totalPrice;
    });
    return total;
  }

  async createOrder() {    
    if (this.deliveryId == null) {
      this.deliveryId = 1;
    };
    this.orderForm.addControl("items", this.fb.control(this.items));
    console.log(this.orderForm.value);
    const formData = new FormData();
    formData.append("accountId", this.user.id.toString());
    formData.append("fullName", this.orderForm.get("fullName").value);
    formData.append("phone", this.orderForm.get("phone").value);
    formData.append("email", this.orderForm.get("email").value);
    formData.append("deliveryId", this.deliveryId.toString());
    for (const index in this.items) {
      // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
      formData.append(`items[${index}]`, this.items[index].id.toString());
    }
    const result = await this.orderService.createOrder(formData).toPromise();
    this.order = result;
    console.log("orderId ", this.order.id);
    this.processing = true;
    const paymentIntent = await this.createPaymentIntent(this.order.id);
    console.log("paymentIntent ", paymentIntent);
    if (paymentIntent != null) {
      this.toastr.success("Đơn hàng đã được thanh toán ");
      this.router.navigate(['../books']);
    }
  }

  private async createPaymentIntent(id: number) {
    console.log(id);
    return this.orderService.payment(id).toPromise();
  }

  private confirmPaymentWithStripe(paymentIntent) {
    console.log("nameOnCard ", this.orderForm.get("nameOnCard").value);
    console.log("cardNumber ", this.cardNumber);
    return this.stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.orderForm.get("nameOnCard").value,
        },
      },
    });
  }

  loadCart() {
    this.cartService.getCart(this.user.id).subscribe((response) => {
      this.cart = response;
      this.items = response.items;
    });
  }
  loadUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });

    this.accountService.getUser(this.user.id).subscribe((respone) => {
      this.user = respone;
    });
  }
}
