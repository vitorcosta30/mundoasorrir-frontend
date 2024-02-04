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
  isSucess: boolean = true;

  constructor(private calendarService : CalendarService,
    private activatedRoute: ActivatedRoute,
    ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getEvent(id);
    })
  }
  setDateFormat(): void{
    if(this.event?.type == 'REUNIÃO'){
      this.dateFormat = "d/M/yyyy HH:mm"
      this.headerColour = colors.blue.primary;
      this.type = "Reunião";
    }
    if(this.event?.type == 'MISSÃO' || this.event?.type == 'FÉRIAS'){
      this.dateFormat = "d/M/yyyy"
    }
    if(this.event?.type == 'FÉRIAS'){
      this.headerColour = "#e3bc08";
      this.type = "Férias";

    }    
    if(this.event?.type == 'MISSÃO' ){
      this.headerColour = '#ad2121';
      this.type = "Missão";

    }
  }

  getEvent(id: string): void {
    this.calendarService.getEventDetails(id).subscribe({
      next: res => {
      this.isSucess = true
      this.event = res
      this.getEnrolledUsers(id);

      this.setDateFormat();

      },
      error: err => {
        this.isSucess = false

      }
  })
  }

  getEnrolledUsers(id: string): void {
    this.calendarService.getEventMembers(id).subscribe(res => this.enrolledUser = res)
  }





}
