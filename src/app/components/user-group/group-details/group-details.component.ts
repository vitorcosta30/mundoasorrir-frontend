import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/groups/group.service';
import { Group } from '../../../models/group-list.model';
import { User } from '../../../models/user.model';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  popup: boolean = false;
  group?: Group;
  users: User[] = [];

  userToBeAdded: string ="";

  message: string = "";

  usersNotInGroup: User[] = [];

  id: string = ""

  constructor(private groupService : GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private storageService: StorageService
    ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getGroup();
      this.getUsersInGroup();
      this.getUsersNotInGroup();
    })
  }
  isAllowed(): boolean{
    return this.storageService.isManager(); 
  }

  getGroup(): void {
    this.groupService.getGroup(this.id).subscribe(res => this.group = res)
  }

  getUsersInGroup(): void {
    this.groupService.getGroupUsers(this.id).subscribe(res => this.users = res)
  }

  getUsersNotInGroup(): void {
    this.groupService.getUsersNotInGroup(this.id).subscribe(res => this.usersNotInGroup = res)
  }
  removeUser(username: string): void{
    this.groupService.removeUser(this.id,username).subscribe(res => {    this.getUsersInGroup();
      this.getUsersNotInGroup();
    });
  }


  addUser(): void{
    this.groupService.addUser(this.id,this.userToBeAdded).subscribe(res => { 
      this.message = res.message;
   
      this.getUsersInGroup();
      this.getUsersNotInGroup();
      this.userToBeAdded = "";
    });
  }

  leaveGroup():void{
    this.groupService.leaveGroup(this.id).subscribe(res => { 

      this.message = res.message;
      this.router.navigate(['/groups']);
   

    });

  }
}
