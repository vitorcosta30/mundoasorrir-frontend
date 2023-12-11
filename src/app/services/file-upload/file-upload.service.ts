import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  upload(file: File, users: string[], groups: string[]): Observable<any> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    formData.append('file', file, file.name);
    for(var i = 0 ;  i < users.length;i++){
      formData.append('users', users[i]);
    }
    for(var i = 0 ;  i < groups.length;i++){
      formData.append('groups', groups[i]);
    }

    return this.http.post(`${this.baseUrl}files/upload`,formData);
    /** 

    const req = new HttpRequest('POST', `${this.baseUrl}/api/files/upload`, formData,  {
      reportProgress: true,
      responseType: 'blob'    });

    return this.http.request(req);
    */
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}files/files`);
  }

  getMaxUpload(): Observable<any> {
    return this.http.get(`${this.baseUrl}files/maxUploadSize`);
  }



}


