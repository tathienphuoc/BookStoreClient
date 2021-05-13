import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
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

  currentUser$: Observable<any>;
  currentUserFB$: Observable<SocialUser>;
  constructor(private accountService : AccountService, private router: Router,
    private toastr: ToastrService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    this.currentUserFB$  = this.authService.authState;
    this.currentUser$ = this.accountService.currentUser$;
    if (this.href === "/") {
      this.visible = true;
    }
    
  }

  logout() {
    this.accountService.logout();
    this.authService.signOut();
  }
}
