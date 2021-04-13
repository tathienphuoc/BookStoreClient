import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  books: Book[];
  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBook();
    this.loadBooks();
  }
  loadBook() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('bookId')).subscribe(book => {
      this.book = book;
    })
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response;
    })
  }
  
}
