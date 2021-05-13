import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from "rxjs/operators";
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  register(model: any) {
    console.log(model);
    
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        console.log(user);
        this.setCurrentUser(user);
      })
    )
  }
  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + "users/" + id).pipe(
      map(response => {
        return response;
      }))
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
        })
    )
  }

  setCurrentUser(user: any) { 
    console.log('setCurrentUser ', user);

    if (user != null) {
      if (user.token != undefined) {
        const roles = this.getDecodedToken(user.token).role;
        user.roles = roles;
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href='/home';
    this.currentUserSource.next(null!);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
