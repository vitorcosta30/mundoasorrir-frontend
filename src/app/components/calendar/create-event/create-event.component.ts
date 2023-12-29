import { Component } from '@angular/core';
import {  OnInit, EventEmitter,Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { GroupService } from '../../../services/groups/group.service';
import { User } from '../../../models/user.model';
import { UserGroup } from '../../user-group/create-user-group/user-group.model';
import { EventType } from '../../../models/event-type.model';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { EventModel } from '../../../models/event.model';
import { retry } from 'rxjs';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements  OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  availableEventTypes : EventType[] = [];

  description = '';
  place = '';

  startDate = new Date();
  endDate = new Date();
  eventType = '';
  users: string[] = [];
  availableUsers: User[] = [];

  availableGroups: UserGroup[] = [];
  constructor(private calendarService: CalendarService, private userService: UserService,private groupService: GroupService) { }
  ngOnInit(): void {
    this.getUsers();
    this.getGroups();
    this.getEventTypes();


  }
  validated(): boolean{
    return this.areDatesGood() && this.eventTypeGood();

  }
  areDatesGood(): boolean{
    return this.startDate  < this.endDate;
  }
  eventTypeGood(): boolean{
    for(var i = 0; i< this.availableEventTypes.length;i++){
      if(this.availableEventTypes[i].name == this.eventType){
        return true;
      }
    }
    return false;
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(res => this.availableUsers = res)
  }
  getGroups(): void{
    this.groupService.getGroupsSimple().subscribe(res => this.availableGroups = res)
  }
  getEventTypes():void{
    this.calendarService.getEventTypes().subscribe(res => this.availableEventTypes = res)
  }


  addUser(): void{
    this.users.push('')
  }
  groups: string[] = [];

  addGroup(): void{
    this.groups.push('')
  }

  onSubmit(): void {
    let newEvent = new EventModel(this.endDate.toString(),this.startDate.toString(),this.description,this.place,this.groups,this.users);

    this.calendarService.createEvent(newEvent, this.eventType).subscribe({
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
