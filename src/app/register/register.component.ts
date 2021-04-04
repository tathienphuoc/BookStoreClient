import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  validationErrors: string[] = [];
  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.initializeFrom();
  }

  initializeFrom() {
    this.registerForm = this.fb.group({
      userName: ['',Validators.required],
      fullName: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      homeAddress: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValue('password')]]
    })
  }

  register() { 
    this.accountService.register(this.registerForm.value).subscribe(response => {
      console.log(response);
      this.route.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
      console.log(error);
    })
  }

  matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatch: true}
    }
  }

  cancel() {
    this.route.navigateByUrl('/');
    this.cancelRegister.emit(false);  
  }
}
