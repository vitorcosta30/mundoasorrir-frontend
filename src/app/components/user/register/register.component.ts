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
  form: any = {
    username: null,
    email: null,
    password: null,
    role: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles : Role[] = [];
  roleNameDropdownSettings: any;


  constructor(private authService: AuthService) { }
  
  
  ngOnInit(): void {
    this.getRoles();


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
    const { username, email, password, role } = this.form;

    this.authService.register(username, email, password, role).subscribe({
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