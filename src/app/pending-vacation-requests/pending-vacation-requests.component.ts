import { Component, OnInit } from '@angular/core';
import { VacationService } from '../services/vacation/vacation.service';
import { PendingRequest } from './pending-request.model';

@Component({
  selector: 'app-pending-vacation-requests',
  templateUrl: './pending-vacation-requests.component.html',
  styleUrls: ['./pending-vacation-requests.component.css']
})
export class PendingVacationRequestsComponent implements OnInit{
  pendingRequests : PendingRequest [] = [];


  constructor(private vacationService :  VacationService){
  }
  ngOnInit(): void {
    this.getPendingRequests();
  }

  getPendingRequests(): void {
    this.vacationService.getPendingRequests().subscribe(res => this.pendingRequests =  res);
  }


  rejectRequest(requestId : string): void {
    this.vacationService.rejectRequest(requestId).subscribe(res => {
      this.getPendingRequests();
    })
  }

  acceptRequest(requestId : string): void {
    this.vacationService.acceptRequest(requestId).subscribe(res => {
      this.getPendingRequests();
    })
  }

}
