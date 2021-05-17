import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  model: any = {};
  user: SocialUser;
  loggedIn: boolean;
  currentUser$: Observable<any>;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.toastr.success("Đăng nhập thành công");
      window.location.href = "/";
    }, error => {
      this.toastr.error(error.error);
    });
  }
  signInWithFB() {
    this.currentUser$ = this.authService.authState;
    const result = this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    result
      .then((user) => {
        if (user != null || user != undefined) {
          this.user = user;
          console.log(this.user);
          const model = {
            userName: this.user.email,
            fullName: this.user.name,
            email: this.user.email,
            password: this.user.email,
            image: this.user.response.picture.data.url,
            phoneNumber: null,
            homeAddress: null,
          };
          this.accountService.register(model).subscribe((response) => {
            console.log('user ',response);
            this.toastr.success("Đăng nhập thành công");
            this.router.navigate(['../']);
          }, error => {
            console.log('error ',error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // this.router.navigate(['../']);
      });
  }
  register() {
    this.router.navigateByUrl("register");
  }
  cancel() {
    this.router.navigateByUrl("/");
  }
}
