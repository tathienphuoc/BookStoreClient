import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { AuthorService } from 'src/app/_services/author.service';
import { Author } from 'src/app/models/author';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BookParams } from 'src/app/models/bookParams';
import { ReviewParams } from 'src/app/models/reviewParams';
import { ReviewService } from 'src/app/_services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  books: Book[];
  authors: Author[];
  reviews: Review[];
  user: User;
  a = 0;
  reviewParams: ReviewParams;
  constructor(private bookService: BookService, private route: ActivatedRoute, 
    private authorService: AuthorService, private accountService: AccountService,
    private toastr: ToastrService, private reviewService: ReviewService) { 
      accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.user = user;
        this.reviewParams = new ReviewParams(user);
      });
     }

  ngOnInit(): void {
    this.loadBook();
    this.getReview();
  }
  loadBook() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('bookId')).subscribe(book => {
      this.book = book;
      this.reviewParams.bookId = book.id;
      this.loadAuthorByBook(book.id);
    })
  }
  loadAuthorByBook(id: number) {
    this.authorService.getAuthorByBook(id).subscribe(authors => {
      this.authors = authors;
    })
  }
  addLike() {
    this.reviewService.addLike(this.reviewParams).subscribe(() =>{
      this.toastr.success("Bạn đã thích sách " + this.book.title);
    }, error => {
      this.toastr.error(error.error);
    })
  }
  getReview() {
    this.reviewService.getReviews().subscribe(reviews => {
      this.reviews = reviews;   
      for (let index = 0; index < reviews.length; index++) {
        let element = reviews[index];
        if (element.bookId == this.book.id) {
          this.a++;
        }
      }   
    })
  }
}
