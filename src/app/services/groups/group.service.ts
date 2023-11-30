import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = environment.apiURL ;

  constructor(private http: HttpClient) { }

  createGroup(groupName: string,groupDesignation: string, users: string[]): Observable<any> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    formData.append('groupName', groupName);
    formData.append('groupDesignation', groupDesignation);


    for(var i = 0 ;  i < users.length;i++){
      formData.append('users', users[i]);
    }


    return this.http.post(`${this.baseUrl}userGroup/createGroup`,formData);

  }

  getGroupsSimple(): Observable<any>{
    return this.http.get(`${this.baseUrl}userGroup/getGroupsSimple`)
  }

  getGroupUsers(groupId: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('groupId',groupId);
    return this.http.post(`${this.baseUrl}userGroup/getUsersInGroup`,formData)
  }
  getUsersNotInGroup(groupId: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('groupId',groupId);
    return this.http.post(`${this.baseUrl}userGroup/getUsersNotInGroup`,formData)
  }

  getGroup(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}userGroup/${id}`)
  }


  removeUser(groupId: string, username: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('groupId',groupId);

    formData.append('username',username);

    return this.http.post(`${this.baseUrl}userGroup/removeUser`,formData)
  }
  addUser(groupId: string, username: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('groupId',groupId);

    formData.append('username',username);

    return this.http.post(`${this.baseUrl}userGroup/addUser`,formData)
  }

  leaveGroup(groupId: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('groupId',groupId);


    return this.http.post(`${this.baseUrl}userGroup/leaveGroup`,formData)
  }




}