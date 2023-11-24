import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const USER_API = 'http://localhost:9000/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}



  getRoles(): Observable<any>{
    return this.http.get(USER_API + 'getRoles',{}).pipe();
  }


  getUsers(): Observable<any> {
    return this.http.get(USER_API + 'getUsers', { }).pipe();
  }

  getUser(username: string):  Observable<any>{

    return this.http.get<any>(USER_API + 'getInfo/'+username,{}).pipe();


  }


}