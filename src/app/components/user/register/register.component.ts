import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Role } from '../../../models/role.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username = ""
    email = ""
    password = ""
    role =  ""
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles : Role[] = [];
  roleNameDropdownSettings: any;


  constructor(private authService: AuthService) { }
  
  
  ngOnInit(): void {
    this.getRoles();


  }
  validUsername(): boolean{
    return this.usernameIsNull() || this.usernameIsTooSmall() || this.usernameIsTooBig()
  }
  validPassword(): boolean{
    return this.passwordIsNull() || this.passwordIsTooSmall()


  }
  passwordIsNull(): boolean{
    return this.password.length == 0
  }

  emailIsNull(): boolean{
    return this.email.length == 0
  }  
  usernameIsNull(): boolean{
    return this.username.length == 0
  }
  passwordIsTooSmall(): boolean{
    return this.password.length < 6

    
  }
  isEmail(): boolean{
    return this.email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null
  }
  emailIsGood(): boolean{
    return this.emailIsNull() || this.isEmail()
  }

  roleIsGood(): boolean{
    return this.role.length == 0
  }

  usernameIsTooSmall(): boolean{
    return this.username.length < 4
  }
  usernameIsTooBig(): boolean{
    return this.username.length >= 20
  }

  goodToSubmit(): boolean {
    return this.roleIsGood() || this.emailIsGood() || this.validUsername() || this.emailIsGood() || this.validPassword()
  }
  initDropdownSettings() {
    this.roleNameDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      maxHeight: '200'
    };
  }
  getRoles(): void {
    this.authService.getRoles().subscribe(r => this.roles = r);
  }

  onSubmit(): void {

    this.authService.register(this.username, this.email, this.password, this.role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}