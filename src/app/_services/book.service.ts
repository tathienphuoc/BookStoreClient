import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.apiUrl;
  books: Book[] = [];
  constructor(private http: HttpClient) { 

  }

  getBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'book')
      .pipe(map(response => {
        return response;
      }))
  }

  getBook(bookId: string) {
    return this.http.get<Book>(this.baseUrl+'book/'+bookId).pipe(
      map(response => {
        return response;
    }))
  }
}
