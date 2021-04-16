import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookParams } from 'src/app/models/bookParams';
import { Pagination } from 'src/app/models/pagination';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent implements OnInit {
  books: Book[];
  bookParams: BookParams;
  pagination: Pagination;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks() {
    this.bookService.getBooks(this.bookParams).subscribe(response => {
      this.books = response.result;
      this.pagination = response.pagination;
    })
  }
}
