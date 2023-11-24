import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventDTO } from '../calendar/calendar.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit{
  event?: CalendarEventDTO;
  enrolledUser: User[] = [];

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

  getEvent(id: string): void {
    this.calendarService.getEventDetails(id).subscribe(res => this.event = res)
  }

  getEnrolledUsers(id: string): void {
    this.calendarService.getEventMembers(id).subscribe(res => this.enrolledUser = res)
  }





}
