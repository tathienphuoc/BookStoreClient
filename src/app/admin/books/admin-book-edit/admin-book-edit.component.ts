import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-admin-book-edit',
  templateUrl: './admin-book-edit.component.html',
  styleUrls: ['./admin-book-edit.component.css']
})
export class AdminBookEditComponent implements OnInit {
@ViewChild ('editForm') editForm: NgForm;
book: Book;
authors: Author[];
@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}
  constructor(private bookService: BookService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBook();
  } 
  
  loadBook() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('bookId')).subscribe(book => {
      this.book = book;
      console.log(book);
    })
  }

}
