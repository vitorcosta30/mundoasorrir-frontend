import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { AttendanceService } from '../../../services/attendance/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  usersInDay : User [] = [];
  date = new Date();
  message = "";


  constructor(private vacationService :  AttendanceService){
  }
  ngOnInit(): void {
    this.getUnmarkedPresences();
  }

  getUnmarkedPresences(): void {
    this.vacationService.getUnmarkedRequest(this.date.toString()).subscribe(res => this.usersInDay =  res);
  }
  isPresent(username: string): void{
    this.vacationService.isPresent(this.date.toString(),username).subscribe(res =>{
      this.message = res.message;
      this.getUnmarkedPresences();
    }
      );

  }

  isDateGood(): boolean{
    let day = this.date.getDay();
    return day == 0 || day == 6;
  }
  isAbsent(username: string): void{
    this.vacationService.isAbsent(this.date.toString(),username).subscribe(res =>{
      this.message = res.message;
      this.getUnmarkedPresences();
    }
      );
    
  }



}
