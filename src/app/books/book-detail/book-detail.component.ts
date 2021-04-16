import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { AuthorService } from 'src/app/_services/author.service';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  books: Book[];
  authors: Author[];
  constructor(private bookService: BookService, private route: ActivatedRoute, 
    private authorService: AuthorService) { }

  ngOnInit(): void {
    this.loadBook();
  }
  loadBook() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('bookId')).subscribe(book => {
      this.book = book;
      this.loadAuthorByBook(book.id);
    })
  }
  loadAuthorByBook(id: number) {
    this.authorService.getAuthorByBook(id).subscribe(authors => {
      this.authors = authors;
    })
  }
}
