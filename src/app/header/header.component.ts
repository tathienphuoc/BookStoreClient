import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Item } from "../models/item";
import { User } from "../models/user";
import { AccountService } from "../_services/account.service";
import { CartService } from "../_services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public href: string = "";
  model: any = {};
  visible = false;
  account: User;
  Items: Item[];

  currentUser$: Observable<any>;
  currentUserFB$: Observable<SocialUser>;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private authService: SocialAuthService,
    private cart: CartService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.account = user;
    });
  }

  ngOnInit(): void {
    this.href = this.router.url;
    this.currentUserFB$ = this.authService.authState;
    this.currentUser$ = this.accountService.currentUser$;
    if (this.href === "/") {
      this.visible = true;
    }
    this.getCart();
  }

  getCart() {
    this.cart.getCart(this.account?.id).subscribe(response => {
      this.Items = response.items;
    })
  }

  countItems(){    
    return this.Items?.length;
  }

  logout() {
    this.accountService.logout();
    this.authService.signOut();
  }
}
