import { Component, OnInit } from '@angular/core';
import { colors } from './colors';
import {
  CalendarView, CalendarEvent
} from 'angular-calendar';
import { CalendarService } from '../services/calendar/calendar.service';
import { CalendarEventDTO } from './calendar.model';
import { async } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
}
)
export class CalendarComponent  implements OnInit{
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  constructor (private calendarService : CalendarService){
  }
  debugString : String = "test";
  locale: string = 'pt';

  events: CalendarEvent[] = [];
  eventsList: CalendarEventDTO[] = [];



  ngOnInit() {

    this.getEvents();


  }
  getEvents(): void{
    this.calendarService.getEvents().subscribe(e => {
      this.eventsList = e
      this.debugString = JSON.stringify(this.eventsList);
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
        this.debugString = JSON.stringify(this.events);
        document.getElementById('hoje')?.click()


      }    
    
    
    });

  }
  setView(view: CalendarView) {
    this.view = view;
    console.log(this.viewDate);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

}

