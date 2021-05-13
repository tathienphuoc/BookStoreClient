import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { map } from "rxjs/operators";
import { Author } from "../models/author";
import { Book } from "../models/book";
import { BookParams } from "../models/bookParams";
import { Category } from "../models/category";
import { Review } from "../models/review";
import { AuthorService } from "../_services/author.service";
import { BookService } from "../_services/book.service";
import { CategoryService } from "../_services/category.service";
import { ReviewService } from "../_services/review.service";

@Component({
  selector: "app-rank",
  templateUrl: "./rank.component.html",
  styleUrls: ["./rank.component.css"],
})
export class RankComponent implements OnInit, AfterViewInit {
  categories: Category[];
  reviews: Review[];
  bookIds: number[];
  books: Book[];
  authors: Author[];
  bookParams: BookParams;
  value: number;
  constructor(
    private reviewService: ReviewService,
    private categoryService: CategoryService,
    private bookService: BookService
  ) {
    this.bookParams = new BookParams();
  }
  ngAfterViewInit(): void {
    let categories = document.getElementsByClassName('btn');
    for (let i = 0; i < categories.length; i++) {
      categories[i].addEventListener('click', function () {
        let preActive = document.querySelector("[class*='btn btn-lg active']")
        preActive.classList.remove("active");
        categories[i].classList.add("active");
      })
    }
  }

  getNumOfLike() {}

  ngOnInit(): void {
    this.loadAllReview();
    this.loadCatgories();
    this.loadBooks();  
  }
  loadAllReview() {
    this.reviewService.getReviews().subscribe((response) => {
      this.reviews = response;
      console.log(this.reviews);
    });
  }

  changeCategory(categoryId: number) { 
    this.bookParams.categoryid = categoryId;
    this.loadBooks();
  }

  loadBooks() {
    this.bookParams.pageSize = 10;
    this.bookService.getBooks(this.bookParams).subscribe(response => {
      this.books = response.result.sort((one, two) => (one.reviews.length > two.reviews.length ? -1 : 1));            
    })
  }
  count(book: Book) {
    return book.reviews.length;
  }
  showRank() {
    let a = 2;
    return a++;
  }
  countLike(reviews: Review[], bookId: number) {
    var output = 0;
    reviews.forEach((e) => {
      if (e["bookId"] != bookId) {
        output++;
      }
    });
    return output;
  }
  loadCatgories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }
}
