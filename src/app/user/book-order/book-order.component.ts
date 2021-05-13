import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Item } from 'src/app/models/item';
import { OrderRecipts } from 'src/app/models/orderRecipts';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-book-order',
  templateUrl: './book-order.component.html',
  styleUrls: ['./book-order.component.css']
})
export class BookOrderComponent implements OnInit {
  @Input() item: Item;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    
  }

  displayCategory(book: Book) {
    let name: string[] = [];
    let categories = book.bookCategories;
    console.log(categories);
    
    categories.forEach(element => {
      name.push(' '+element.category.name);
    });
    return name;
  }

}
