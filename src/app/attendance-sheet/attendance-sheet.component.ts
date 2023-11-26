import { Component } from '@angular/core';
import { Attendance } from './attendance.model';
import { AttendanceService } from '../services/attendance/attendance.service';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent {
  attendanceInDay : Attendance [] = [];
  date = new Date();


  constructor(private attendanceService :  AttendanceService){
  }
  ngOnInit(): void {
    this.getAttendanceSheet();
  }

  getAttendanceSheet(): void {
    this.attendanceService.getAttendanceSheet(this.date.toString()).subscribe(res => this.attendanceInDay =  res);
  }


}
