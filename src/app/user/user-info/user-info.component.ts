import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User;
  currentUser$: Observable<User>;
  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
    }
    
    ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{ 
      this.user = user
      });
      console.log(this.user);
      
  }

}
