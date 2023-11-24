import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../../services/user/user.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventDTO } from 'src/app/calendar/calendar.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  user?: User;
  eventsList: CalendarEventDTO[] = [];
  locale: string = 'pt';
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  constructor (private userService : UserService,
    private activatedRoute: ActivatedRoute,
    private calendarService : CalendarService,
    ){
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const username = params['username'];
      this.getEvents(username);
      this.getUser(username);

    })

  }

  getEvents(username : string): void {
    this.calendarService.getUserEvents(username).subscribe(e => {
      this.eventsList = e
      for(let i = 0;  i < this.eventsList.length; i++){
        let event : CalendarEventDTO = this.eventsList[i];
        let eventCalendar : CalendarEvent = {title: event.title,start:new Date(event.start), end:new Date(event.end),id : event.id};
        this.events.push(eventCalendar);

      }    
    
    
    });

  }


  getUser(username : string): void {
    this.userService.getUser(username).subscribe(res => this.user = res);

  }
  setView(view: CalendarView) {
    this.view = view;
    console.log(this.viewDate);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}
