import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  author: Author[] = [];
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAuthors() {
    return this.http.get<Author[]>(this.baseUrl + 'author/')
      .pipe(map(response => {
        return response;
      }))
  }

  getAuthorByBook(id: number) {
    return this.http.get<Author[]>(this.baseUrl + 'author/by-book/'+id)
      .pipe(map(response => {
        return response;
      }))
  }
}
