import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  route: string = "";
  title = 'Book Store';
  constructor(private http: HttpClient, private accountService: AccountService,private router: Router){}

  ngOnInit() {
    this.setCurrentUser();
  }
  geturl() {    
    return this.route = location.pathname;
  }
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }
}
