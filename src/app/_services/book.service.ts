import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { BookParams } from '../models/bookParams';
import { ReviewParams } from '../models/reviewParams';
import { getPaginationHeaders, getPaginationResult } from './paginationHelpers';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.apiUrl;
  books: Book[] = [];
  constructor(private http: HttpClient) { 

  }

  getBooks(bookParams: BookParams) {
    // var response = this.bookCache.get(Object.values(bookParams).join('-'));  
    // if (response) {
    //   return of(response);
    // }    
    
    let params = getPaginationHeaders(bookParams.pageNumber, bookParams.pageSize);
    if(bookParams.categoryid?.toString()!=null){
      params = params.append('categoryid', bookParams.categoryid.toString());
    }
    if(bookParams.authorid?.toString()!=null){
      params = params.append('authorid', bookParams.authorid.toString());
    }
    if(bookParams.titleSearch != ""){
      params = params.append('titleSearch', bookParams.titleSearch);
    }
    console.log(params);
    
    return getPaginationResult<Book[]>(this.baseUrl + 'book/', params, this.http)
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

  addBook(model: any) {
    JSON.stringify(model) 
    return this.http.post(this.baseUrl+'book/', model).pipe(
      map(response => {
        return response;
      }))
  }

  deleteBook(bookId: number) {
    return this.http.delete(this.baseUrl +'book/'+bookId).pipe(
      map(response => {
        return response;
      })
    )
  }
}
