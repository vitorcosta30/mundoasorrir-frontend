import { Component } from '@angular/core';
import { colors } from './colors';
import {
  CalendarView, CalendarEvent
} from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
}
)
export class CalendarComponent  {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Interview 1 - Backend - Candidate: Pablo Villegas - Interviewer: Luis Cervantes',
      color: colors.yellow,
      start: new Date('July 31, 2019 03:24:00'),
      end: new Date('July 31, 2019 5:24:00')
    },
    {
      title: 'Interview 1 - Backend - Candidate: Pablo Villegas - Interviewer: Luis Cervantes',
      color: colors.yellow,
      start: new Date('July 31, 2019 03:24:00'),
      end: new Date('July 31, 2019 5:24:00')
    },
    {
      title: 'Interview 1 - Backend - Candidate: Pablo Villegas - Interviewer: Luis Cervantes',
      color: colors.yellow,
      start: new Date('July 31, 2019 03:24:00'),
      end: new Date('July 31, 2019 5:24:00')
    },
    {
      title: 'Interview 2 - Frontend',
      color: colors.yellow,
      start: new Date('July 25, 2019 03:24:00'),
      end: new Date('July 25, 2019 5:24:00')
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date()
    },
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date()
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date()
    },
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date()
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date()
    }
  ];

  ngOnInit() {
  }

  setView(view: CalendarView) {
    this.view = view;
    console.log(this.viewDate);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

}

