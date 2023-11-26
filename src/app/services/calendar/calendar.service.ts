import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventDTO } from 'src/app/calendar/calendar.model';
import { EventModel } from 'src/app/create-event/event.model';
import { environment } from 'src/enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = environment.apiURL ;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}events/getEvents`,{

    }).pipe();


  }

  getUserEvents(username: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}events/getUserEvents/`+username,{}).pipe();
  }
  getEventDetails(eventId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}events/getEvent/`+eventId,{}).pipe();
  }
  getEventMembers(eventId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}events/getEventMembers/`+eventId,{}).pipe();
  }


  getEventTypes(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}events/getEventType`,{}).pipe();

  }

  createEvent(event: EventModel,eventType: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('startDate',event.start);
    formData.append('endDate',event.end);

    formData.append('description',event.description);
    formData.append('place',event.place);
    formData.append('eventType',eventType);

    for(var i = 0 ;  i < event.users.length;i++){
      formData.append('users', event.users[i]);
    }
    for(var i = 0 ;  i < event.groups.length;i++){
      formData.append('groups',event.groups[i]);
    }




    return this.http.post<any>(`${this.baseUrl}events/createEvent`, formData);

  }

}