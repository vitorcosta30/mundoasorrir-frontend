import { Component, OnInit } from '@angular/core';
import { Month } from 'src/app/models/month.model';
import { PresenceUser } from 'src/app/models/presence-user.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-get-presences-by-user',
  templateUrl: './get-presences-by-user.component.html',
  styleUrls: ['./get-presences-by-user.component.css']
})
export class GetPresencesByUserComponent implements OnInit {
  months: Month [] = environment.months;

  selectedMonth: Month = new Month (0, "indefinido");

  year: number = 0;


  selectedUser: User =  new User("","","","",false,new Project(0,"","",true));

  years: number[] = [];

  userPresences: PresenceUser[]= [];
  submitted: boolean = false;

  submittedMonth: string = "";

  submittedYear: number = 0;
  submittedUser: string = "";
  submittedPerMonth: boolean = false;



  username: string = "";
  users: User[] = []
  perMonth: boolean = false;


  constructor(private userService: UserService,  private storageService: StorageService){}
  ngOnInit(): void {
    this.getUsers();
  
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 20; year <= currentYear + 1; year++) {
      this.years.push(year);
    }
  
  }


  getPresencesMonth(){
    this.userService.getPresencesMonth(this.selectedUser.username ,this.year,this.selectedMonth.id).subscribe(res => {
      this.userPresences = res
      this.submittedMonth = this.selectedMonth.designation
      this.submittedUser = this.selectedUser.username
      this.submittedYear = this.year
      this.submittedPerMonth = true

      this.submitted = true;

    })

  }

  getPresencesYear(){
    this.userService.getPresencesYear(this.selectedUser.username,this.year).subscribe(res => {
      this.userPresences = res
      this.submittedUser = this.selectedUser.username
      this.submittedYear = this.year
      this.submittedPerMonth = false
      this.submitted = true
    })

  }

  getUsers(): void {
    this.userService.getUsers().subscribe(res => this.users = res);
  }
  switchFilter(): void {
    this.perMonth = !this.perMonth;
    this.selectedMonth = new Month (0, "indefinido");
  }
  allowed(): boolean{
    return ((this.selectedMonth.id>0 && this.selectedMonth.id <=12) || !this.perMonth) && this.year >0 && this.selectedUser.username.length > 4;
  }



  onSubmit(): void{
    if(this.perMonth){
      this.getPresencesMonth()
    }else{
      this.getPresencesYear()
    }

  }



}
