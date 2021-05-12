import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendMail(formData: FormData) {
    return this.http.post(this.baseUrl+'mail/send', formData).pipe(
      map(response => {
        return response;
      })
    )
  }
}
