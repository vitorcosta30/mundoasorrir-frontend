import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  users: User[] = [];
  constructor (private userService : UserService){
  }
  ngOnInit(): void {
    this.getUsers();

  }


  getUsers(): void {
    this.userService.getUsers().subscribe(res => this.users = res);

  }

}
