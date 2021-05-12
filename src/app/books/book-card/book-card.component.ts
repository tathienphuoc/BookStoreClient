import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Author } from 'src/app/models/author';
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
  @Input() author: Author;
  user: User = undefined;
  bookIds: Array<Book> = [];
  shoppingcartParam: ShoppingCartParam;
  id: number;
  constructor(private sanitizer: DomSanitizer,private shoppingcartService : CartService, 
              private accountService: AccountService, private route: Router,
              private toastr: ToastrService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }

  showPrice(book: Book){
    if(book.discount == 0) {
      return book.price;
    } else {
      return Number((book.price - book.price*book.discount).toFixed(1)); ;
    }
  }
  showAuthor (book: Book) {
    const author = book.authorBooks[0].author.fullName;
    return author;
  }

  addToCart(accountId: number, book: Book) {
    this.bookIds.push(book);
    if(this.user?.roles == undefined){
      this.toastr.error("Vui lòng đăng nhập trước khi mua hàng !");
    } else {
      this.shoppingcartService.addToCart(accountId, this.bookIds).subscribe(response => {
        window.location.href = '/shoppingcart';
        console.log(response);
      })
    }
  }
}

