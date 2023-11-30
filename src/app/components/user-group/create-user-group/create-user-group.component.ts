import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/groups/group.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-create-user-group',
  templateUrl: './create-user-group.component.html',
  styleUrls: ['./create-user-group.component.css']
})
export class CreateUserGroupComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  

  groupName = '';
  groupDesignation = '';

  users: string[] = [];

  availableUsers: User[] = [];

  constructor (private groupService : GroupService, private userService: UserService){
  }
  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(): void{
    this.userService.getUsers().subscribe(res => this.availableUsers = res)
  }
  addUser(): void{
    this.users.push('')
  }
  onSubmit(): void {

    this.groupService.createGroup(this.groupName, this.groupDesignation, this.users).subscribe({
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
