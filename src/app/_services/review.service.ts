import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { ReviewParams } from '../models/reviewParams';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = environment.apiUrl;
  review: Review[] =[];
  constructor(private http: HttpClient) { }

  addLike(reviewParams: ReviewParams){
    return this.http.post(this.baseUrl+ "review/add-review", reviewParams);
  }

  getReviews() {
    return this.http.get<Review[]>(this.baseUrl+ "review/user-review");
  }
}