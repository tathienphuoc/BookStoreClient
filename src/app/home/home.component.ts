import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../models/book';
import { BookParams } from '../models/bookParams';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model : any = {}
  bookParams: BookParams;
  books: Book[];
  currentUser$: Observable<User>;
  constructor(private accountService : AccountService, private router: Router,
    private toastr: ToastrService, private bookService: BookService) {
      this.bookParams = new BookParams();
     }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.loadBooks();
  }

  loadBooks() {
    this.bookParams.pageSize = 4;
    this.bookService.getBooks(this.bookParams).subscribe(response => {
        this.books = response.result;       
    })
  }

  logout() {
    this.accountService.logout();
  }
}
