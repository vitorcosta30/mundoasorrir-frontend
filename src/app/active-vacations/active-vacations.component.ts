import { Component, OnInit } from '@angular/core';
import { VacationService } from '../services/vacation/vacation.service';
import { PendingRequest } from '../pending-vacation-requests/pending-request.model';

@Component({
  selector: 'app-active-vacations',
  templateUrl: './active-vacations.component.html',
  styleUrls: ['./active-vacations.component.css']
})
export class ActiveVacationsComponent implements OnInit{
  activeVacations : PendingRequest[] = [];
  date = new Date();

  constructor(private vacationService: VacationService){}
  ngOnInit(): void {
    this.getRequestsToday();
  }


  getRequestsToday(): void{
    this.vacationService.getRequestToday().subscribe(res => this.activeVacations = res);
  }

  getRequestsDate(): void{
    this.vacationService.getRequestDate(this.date.toString()).subscribe(res => this.activeVacations = res);


  }

}
