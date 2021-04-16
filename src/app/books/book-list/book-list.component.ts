import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookParams } from 'src/app/models/bookParams';
import { Pagination } from 'src/app/models/pagination';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  bookParams: BookParams;
  pagination: Pagination;
  constructor(private bookService: BookService, private accountService: AccountService) {
    this.bookParams = new BookParams();
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks(this.bookParams).subscribe(response => {
        this.books = response.result;
        this.pagination = response.pagination;
    })
  }
  pageChanged(event: any) {
    this.bookParams.pageNumber = event.page;
    this.loadBooks();
  }
}
