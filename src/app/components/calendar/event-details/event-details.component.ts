import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventDTO } from '../../../models/calendar.model';
import { User } from '../../../models/user.model';
import { DatePipe } from '@angular/common';
import { colors } from '../calendar/colors';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit{
  event?: CalendarEventDTO;
  enrolledUser: User[] = [];
  dateFormat: string = "d/M/yyyy"
  headerColour : string = "#007BFF"
  type: string = "Evento"

  constructor(private calendarService : CalendarService,
    private activatedRoute: ActivatedRoute,
    ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getEvent(id);
      this.getEnrolledUsers(id);
    })
  }
  setDateFormat(): void{
    if(this.event?.type == 'MEETING'){
      this.dateFormat = "d/M/yyyy HH:MM"
      this.headerColour = colors.blue.primary;
      this.type = "Reunião";
    }
    if(this.event?.type == 'MISSION' || this.event?.type == 'VACATION'){
      this.dateFormat = "d/M/yyyy"
    }
    if(this.event?.type == 'VACATION'){
      this.headerColour = "#e3bc08";
      this.type = "Férias";

    }    
    if(this.event?.type == 'MISSION' ){
      this.headerColour = '#ad2121';
      this.type = "Missão";

    }
  }

  getEvent(id: string): void {
    this.calendarService.getEventDetails(id).subscribe(res => {
      this.event = res
      this.setDateFormat();

    })
  }

  getEnrolledUsers(id: string): void {
    this.calendarService.getEventMembers(id).subscribe(res => this.enrolledUser = res)
  }





}
