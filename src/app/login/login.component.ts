import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    form: any = {
        username: null,
        password: null
      };
      isLoggedIn = false;
      isLoginFailed = false;
      
      errorMessage = '';
      username: string = "";
      constructor(private authService: AuthService, private storageService: StorageService) { }

     ngOnInit(): void {


      this.authService.isLoggedIn().subscribe(res => {
        if(res == true){
          this.isLoggedIn = true;
          this.authService.getUser().subscribe(usr => {
            this.storageService.saveUser(usr);
            this.username = this.storageService.getUser().username;
          })
  
        }else{
          this.isLoggedIn = false;
          this.storageService.clean();
        }  
      })
        /*
          if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
          }*/
        }
      
    
      onSubmit(): void {
        const { username, password } = this.form;
    
        this.authService.login(username, password).subscribe({
          next: data => {
            this.storageService.saveUser(data);
    
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.username = this.storageService.getUser().username;
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        });
      }
      getIsLoggedIn(): boolean{
        return this.isLoggedIn;
      }
      getUsername(): String{
        return this.username;
      }
    
      reloadPage(): void {
        window.location.reload();
      }

  }