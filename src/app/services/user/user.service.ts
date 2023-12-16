import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { User } from 'src/app/models/user.model';


const USER_API = environment.apiURL + 'users/';
const AUTH_API = environment.apiURL + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
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
  editUser(id: string, updatedUser: User): Observable<any>{
     const formData: FormData = new FormData();
     formData.append('id',updatedUser.id);
     formData.append('username',updatedUser.username);
     formData.append('role',updatedUser.role);
     formData.append('email',updatedUser.email);



    return this.http.put(USER_API + 'updateUser/'+id,  updatedUser, httpOptions);
    
  }

  deactivateAccount(username:string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('username',username);
    return this.http.post<any>(USER_API  + 'deactivateAccount', formData);

  }

  activateAccount(username:string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('username',username);
    return this.http.post<any>(USER_API  + 'activateAccount', formData);

  }

  getPresencesMonth(username : String, year: number, month: number): Observable<any>{
    return this.http.get(USER_API  + 'getPresences/'+username+"/"+ year+"/"+month)
  }


  getPresencesYear(username : String, year: number): Observable<any>{
    return this.http.get(USER_API  + 'getPresences/'+username+"/"+ year)
  }


}