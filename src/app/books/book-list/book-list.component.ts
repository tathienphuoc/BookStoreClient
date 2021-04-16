import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { BookParams } from 'src/app/models/bookParams';
import { Category } from 'src/app/models/category';
import { Pagination } from 'src/app/models/pagination';
import { AccountService } from 'src/app/_services/account.service';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  authors: Author[];
  categories: Category[];
  bookParams: BookParams;
  pagination: Pagination;
  constructor(private bookService: BookService, private accountService: AccountService, 
    private categoryService: CategoryService, private authorService:AuthorService) {
      this.bookParams = new BookParams();
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
    this.loadCatgories();
  }

  loadBooks() {
    this.bookService.getBooks(this.bookParams).subscribe(response => {
        this.books = response.result;
        this.pagination = response.pagination;
    })
  }
  loadAuthors() {
    this.authorService.getAuthors().subscribe(response => {
        this.authors = response;
        console.log(response); 
    })
  }
  loadCatgories() {
    this.categoryService.getCategories().subscribe(response => {
        this.categories = response;
    })
  }
  pageChanged(event: any) {
    this.bookParams.pageNumber = event.page;
    this.loadBooks();
  }
}
