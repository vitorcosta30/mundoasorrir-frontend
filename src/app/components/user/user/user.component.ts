import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { StorageService } from '../../../services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangePassword } from 'src/app/models/changePassword.model';
import { delay } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  users: User[] = [];
  constructor (private userService : UserService,
    private storageService: StorageService, private authService : AuthService, private projectService: ProjectService){
  }
  userToBeUpdated: User = new User("","","","",false,new Project(0,"",""));
  updateUser : boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  projects: Project[] = []

  roles : Role[] = [];




  changePasswordRequest: ChangePassword = new ChangePassword("", "");
  updatePassword : boolean = false;
  isSuccessfulPassword = false;
  isSignUpFailedPassword = false;
  ngOnInit(): void {
    this.getRoles();
    this.getProjects();
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers().subscribe(res => this.users = res);

  }

  isDirector(): boolean{
    return this.storageService.isDirector();
  }
  activate(username : string): void{
    this.userService.activateAccount(username).subscribe(res =>{
      this.getUsers()
    })

  }
  deactivate(username : string): void{
    this.userService.deactivateAccount(username).subscribe(res =>{
      this.getUsers()
    })
  }

  getRoles(): void {
    this.authService.getRoles().subscribe(r => this.roles = r);
  }
  getProjects(): void {
    this.projectService.getProjects().subscribe(p => this.projects = p);
  }




  updateUserStart(user: User): void{
    this.userToBeUpdated = user

    this.updateUser = true;
  }

  updateUserCancel(): void{
    this.userToBeUpdated = new User("","","","",false,new Project(0,"",""));
    this.updateUser = false;
    this.isSuccessful = false;
    this.isSignUpFailed = false;
    this.getUsers();
  }


  updateUserRequest(id:string):void{
    this.userService.editUser(id, this.userToBeUpdated).subscribe({
      next: async res =>{
      this.isSuccessful = true;
      this.isSignUpFailed = false;

      await this.sleep(2000)


      this.updateUserCancel();


    },
    error: err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  })
  }

   sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  changeUserPasswordStart(user: User): void{
    this.changePasswordRequest.username = user.username


    this.updatePassword = true;
  }

  changeUserPasswordCancel(): void{
    this.changePasswordRequest = new ChangePassword("", "");
    this.updatePassword = false;
    this.isSuccessfulPassword = false;
    this.isSignUpFailedPassword = false;
  }


  updateUserPasswordRequest():void{
    this.authService.setNewPassword(this.changePasswordRequest).subscribe({
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



