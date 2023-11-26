import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


const VACATION_API = environment.apiURL + 'vacation/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class VacationService {
  constructor(private http: HttpClient) {}



  createRequest(startDate: string,endDate: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('startDate',startDate);
    formData.append('endDate',endDate);


    return this.http.post<any>(VACATION_API  + 'createRequest', formData);

  }

  rejectRequest(idRequest:string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('requestId',idRequest);
    return this.http.post<any>(VACATION_API  + 'rejectRequest', formData);

  }
  acceptRequest(idRequest:string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('requestId',idRequest);
    return this.http.post<any>(VACATION_API  + 'acceptRequest', formData);

  }

  getRequestDate(dateString: string): Observable<any>{7
    const formData: FormData = new FormData();
    formData.append('obsDate',dateString);
    return this.http.post<any>(VACATION_API  + 'getActiveVacations', formData);

  }
  getRequestToday(): Observable<any>{

    return this.http.get<any>(VACATION_API  + 'getActiveVacationsToday').pipe();

  }




  getPendingRequests(): Observable<any> {
    return this.http.get(VACATION_API + 'getPendingRequests', { }).pipe();
  }




}