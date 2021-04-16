import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-admin-book-card',
  templateUrl: './admin-book-card.component.html',
  styleUrls: ['./admin-book-card.component.css']
})
export class AdminBookCardComponent implements OnInit {
  @Input() book: Book;
  constructor(private bookService: BookService, private route: Router) { }

  ngOnInit(): void {
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(response=> {
      console.log(response);
      this.route.navigateByUrl('/admin/books');
    })
  }
}
