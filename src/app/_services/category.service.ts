import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  category: Category[];
  constructor(private http: HttpClient) { }
  
  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'category')
      .pipe(map(response => {
        return response;
      }))
  }
}
