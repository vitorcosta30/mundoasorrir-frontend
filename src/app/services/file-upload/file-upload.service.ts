import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/api/files/upload`,formData);
    /** 

    const req = new HttpRequest('POST', `${this.baseUrl}/api/files/upload`, formData,  {
      reportProgress: true,
      responseType: 'blob'    });

    return this.http.request(req);
    */
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/files/files`,{

    } );
  }
}