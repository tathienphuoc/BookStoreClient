import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { BookParams } from 'src/app/models/bookParams';
import { Category } from 'src/app/models/category';
import { Pagination } from 'src/app/models/pagination';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent implements OnInit {
  books: Book[];
  authors: Author[];
  categories: Category[];
  bookParams: BookParams;
  pagination: Pagination;
  constructor(private bookService: BookService, private authorService: AuthorService,
        private categoryService: CategoryService) {
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
