import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


const PROJECT_API = environment.apiURL + 'projects/';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createProject(designation: string, location: string): Observable<any>{
    let formData = new FormData();
    formData.append("designation",designation)
    formData.append("location",location)

    return this.http.post(PROJECT_API+"createProject",formData )
  }
  getProjects(): Observable<any>{

    return this.http.get(PROJECT_API+"getProjects" )
  }


}
