import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventDTO } from 'src/app/models/calendar.model';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { colors } from 'src/app/components/calendar/calendar/colors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  user?: User;
  eventsList: CalendarEventDTO[] = [];
  locale: string = 'pt';
  view: CalendarView = CalendarView.Week;
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
        let eventCalendar : CalendarEvent = {title: event.description,start:new Date(event.start), end:new Date(event.end),id : event.id};
        if(event.type == 'MISSION') {
          eventCalendar.color = colors.red;
          eventCalendar.allDay = true;
          eventCalendar.title = 'Missão -  <a href="/event-details/'+event.id+'" >Detalhes</a> ';

        }else{
          if(event.type=='MEETING'){
          eventCalendar.color = colors.blue;
          eventCalendar.title = 'Reunião - <a href="/event-details/'+event.id+'" >Detalhes</a> ';
          }else{
              if(event.type=='VACATION'){
                eventCalendar.color = colors.yellow;
                eventCalendar.allDay = true;

                eventCalendar.title = 'Férias - <a href="/event-details/'+event.id+'" >Detalhes</a> ';
            }
          }

        }
        this.events.push(eventCalendar);
        document.getElementById('hoje')?.click()


      }   
    })
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
