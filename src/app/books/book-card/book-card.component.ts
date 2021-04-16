import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
