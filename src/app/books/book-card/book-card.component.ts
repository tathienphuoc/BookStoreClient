import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { ShoppingCartParam } from 'src/app/models/shoppingcartParam';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Input() user: User;
  bookIds: number[];
  shoppingcartParam: ShoppingCartParam;
  id: number;
  constructor(private shoppingcartService : CartService, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  
  ngOnInit(): void {
  }
  addToCart(accountId: number, bookId: number) {
    this.bookIds.push(bookId);
    console.log(bookId);
    this.shoppingcartService.addToCart(accountId, this.bookIds).subscribe(response => {
      console.log(response);
    })
  }
}
