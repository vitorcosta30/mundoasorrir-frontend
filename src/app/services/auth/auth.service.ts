import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

const AUTH_API = environment.apiURL +'auth/';

const USER_API = environment.apiURL + 'users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, role: String): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        role
      },
      httpOptions
    );
  }
  getRoles(): Observable<any>{
    return this.http.get(USER_API + 'getRoles',{}).pipe();
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
  getUser(): Observable<any> {
    return this.http.get(AUTH_API + 'getUser', { }).pipe();
  }
  isLoggedIn(): Observable<any> {
    return this.http.get(AUTH_API + 'isLoggedIn', { }).pipe();
  }
  refreshToken() {
    return this.http.post(AUTH_API + 'refreshtoken', { }, httpOptions);
  }
}