import { Component } from '@angular/core';
import { VacationService } from '../../../services/vacation/vacation.service';
@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';


  startDate = new Date();
  endDate = new Date();
  eventType = '';
  users: string[] = [];

  constructor(private vacationService: VacationService) { }

  areDatesGood(): boolean{
    return this.startDate  < this.endDate;
  }






  onSubmit(): void {

    this.vacationService.createRequest(this.startDate.toString(), this.endDate.toString()).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.message = data.message;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


}
