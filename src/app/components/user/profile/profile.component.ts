import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { User } from '../../../models/user.model';
import { ChangeMyPassword } from 'src/app/models/changeMyPassword.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: User;
  role: string = "";
  changePasswordRequest: ChangeMyPassword = new ChangeMyPassword("", "","");
  updatePassword : boolean = false;
  isSuccessfulPassword = false;
  isSignUpFailedPassword = false;

  errorMessage = '';


  constructor(private storageService: StorageService, private authService:  AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.role = this.storageService.getRole();
  }







  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  changeUserPasswordStart(): void{

    this.updatePassword = true;
  }

  changeUserPasswordCancel(): void{
    this.changePasswordRequest = new ChangeMyPassword("", "","");
    this.updatePassword = false;
    this.isSuccessfulPassword = false;
    this.isSignUpFailedPassword = false;
  }

  changePasswordSubmit(): boolean{
    return!( this.passwordsCoincide() && this.minimumSize() && this.newOldDiff());
  }
  passwordsCoincide(): boolean{
    return this.changePasswordRequest.newPassword === this.changePasswordRequest.reNewPassword

  }
  minimumSize():boolean{
    return this.changePasswordRequest.newPassword.length > 4
  }
  newOldDiff():boolean{
    return this.changePasswordRequest.newPassword != this.changePasswordRequest.oldPassword;
  }


  updateUserPasswordRequest():void{
    this.authService.setMyNewPassword(this.changePasswordRequest).subscribe({
      next: async res =>{
        this.isSuccessfulPassword = true;
        this.isSignUpFailedPassword = false;
  
        await this.sleep(2000)
  
  
        this.changeUserPasswordCancel();
  
  
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailedPassword = true;
      }
    })
  }
}
