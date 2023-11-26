import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


const ATTENDANCE_API = environment.apiURL  + 'attendance/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}



  isAbsent(dateString:string, username: string ): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('username',username);
    formData.append('obsDate',dateString);

    return this.http.post<any>(ATTENDANCE_API  + 'markAbsent', formData);

  }
  isPresent(dateString:string, username: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('username',username);
    formData.append('obsDate',dateString);
    return this.http.post<any>(ATTENDANCE_API   + 'markPresent', formData);

  }

  getUnmarkedRequest(dateString: string): Observable<any>{7
    const formData: FormData = new FormData();
    formData.append('obsDate',dateString);
    return this.http.post<any>(ATTENDANCE_API  + 'getUsersUnmarked', formData);

  }
  getAttendanceSheet(dateString: string): Observable<any>{7
    const formData: FormData = new FormData();
    formData.append('obsDate',dateString);
    return this.http.post<any>(ATTENDANCE_API  + 'getAttendanceSheet', formData);

  }



}