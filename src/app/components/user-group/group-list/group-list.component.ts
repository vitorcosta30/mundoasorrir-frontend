import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group-list.model';
import { GroupService } from 'src/app/services/groups/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit{
  groupList: Group[] = [];

  constructor(private groupService: GroupService){}
  ngOnInit(): void {
    this.getGroups();
  }


  getGroups(): void{
    this.groupService.getGroupsSimple().subscribe(res => this.groupList = res);
  }

}
