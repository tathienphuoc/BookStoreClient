import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookParams } from '../models/bookParams';
import { Item } from '../models/item';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';
import { BookService } from '../_services/book.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model : any = {}
  bookParams: BookParams;
  books: Book[];
  currentUser$: Observable<any>;
  currentUserFB$: Observable<SocialUser>;
  account: User;
  Items: Item[];
  constructor(private accountService : AccountService, private router: Router,
    private toastr: ToastrService, private bookService: BookService,
    private authService: SocialAuthService, private cart: CartService) {
      accountService.currentUser$.pipe(take(1)).subscribe((user) => {
        this.account = user;
      });
      this.bookParams = new BookParams();
     }

  ngOnInit(): void {
    this.currentUserFB$  = this.authService.authState;
    this.currentUser$ = this.accountService.currentUser$;
    this.loadBooks();
    this.getCart();
  }
  countItems(){        
    return this.Items?.length;
  }
  getCart() {
    this.cart.getCart(this.account?.id).subscribe(response => {
      this.Items = response.items;
    })
  }
  loadBooks() {
    this.bookParams.pageSize = 4;
    this.bookService.getBooks(this.bookParams).subscribe(response => {
        this.books = response.result;       
    })
  }

  logout() {
    this.accountService.logout();
    this.authService.signOut();
  }
}
