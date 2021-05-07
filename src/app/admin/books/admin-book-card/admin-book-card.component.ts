import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-admin-book-card',
  templateUrl: './admin-book-card.component.html',
  styleUrls: ['./admin-book-card.component.css']
})
export class AdminBookCardComponent implements OnInit {
  @Input() book: Book;
  @Input() author: Author;

  @Output() update = new EventEmitter();

  constructor(private bookService: BookService, private route: Router, private authorService: AuthorService) { }

  ngOnInit(): void {
  }
  showPrice(book: Book){
    if(book.discount == 0) {
      return book.price;
    } else {
      return Number((book.price * book.discount).toFixed(1)); ;
    }
  }
  showAuthor (book: Book) {
    const author = book.authorBooks[0].author.fullName;
    return author;
  }
  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(response=> {
      console.log(response);
      this.update.emit();
    })
  }
}
