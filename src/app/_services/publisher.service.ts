import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Publisher } from '../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPublishers() {
    return this.http.get<Publisher[]>(this.baseUrl + 'publisher')
      .pipe(map(response => {
        return response;
      }))
  }
}
