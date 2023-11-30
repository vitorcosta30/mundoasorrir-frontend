import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  users: User[] = [];
  constructor (private userService : UserService,
    private storageService: StorageService){
  }
  ngOnInit(): void {
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
}
