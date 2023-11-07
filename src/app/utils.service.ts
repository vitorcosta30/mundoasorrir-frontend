import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private messageService: MessageService) { }

  public log(message: string) {
    this.messageService.add(`${message}`);
  }

  public handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message} - ${error.error}`);
      return of(result as T);
    }
  }
}
