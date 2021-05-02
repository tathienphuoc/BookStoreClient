import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public href: string = "";
  model : any = {}
  visible = false;

  currentUser$: Observable<User>;
  constructor(private accountService : AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    this.currentUser$ = this.accountService.currentUser$;
    if (this.href === "/") {
      this.visible = true;
    }
    
  }

  logout() {
    this.accountService.logout();
  }
}
