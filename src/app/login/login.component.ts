import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : any = {}

  currentUser$: Observable<User>;
  constructor(private accountService : AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe(response=>{
      this.toastr.success("Đăng nhập thành công")
      this.router.navigateByUrl('/');
    })
  }
  register() {
    this.router.navigateByUrl('register');
  }
  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }
  cancel() {
    this.router.navigateByUrl('/');
  }

}
