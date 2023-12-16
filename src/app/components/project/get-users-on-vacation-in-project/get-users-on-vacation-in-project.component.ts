import { Component, OnInit } from '@angular/core';
import { Month } from 'src/app/models/month.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-get-users-on-vacation-in-project',
  templateUrl: './get-users-on-vacation-in-project.component.html',
  styleUrls: ['./get-users-on-vacation-in-project.component.css']
})
export class GetUsersOnVacationInProjectComponent implements OnInit {

  months: Month [] = environment.months;

  month: number = 0;

  year: number = 0;


  selectedMonth: Month = new Month (0, "indefinido");

  projects : Project[] = [];



  selectedProject: Project =  new Project(0,"","",true);

  years: number[] = [];

  users: User[]= [];
  submitted: boolean = false;

  submittedMonth: string = "";

  submittedYear: number = 0;
  submittedProject: Project = new Project(0,"","",true);
  submittedPerMonth: boolean = false;



  username: string = "";
  perMonth: boolean = false;



  constructor(private projectService: ProjectService,  private storageService: StorageService){  

  }
  ngOnInit(): void {
    this.getProjects();
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 20; year <= currentYear + 1; year++) {
      this.years.push(year);
    }

  }
  getProjects(): void {
    this.projectService.getProjects().subscribe(res => {

      this.projects = res
    });
  }

  allowed(): boolean{
    return this.year > 0 && this.selectedMonth.id >0 && this.selectedMonth.id <=12;
  }

  onSubmit(): void{
    this.getUsersOnVacations()
  }


  getUsersOnVacations(): void{
    this.projectService.getUsersOnVacationMonth(this.selectedProject.id,this.year,this.selectedMonth.id).subscribe(res => {
      this.users = res
      this.submittedMonth = this.selectedMonth.designation
      this.submittedYear = this.year
      this.submittedProject = this.selectedProject
      this.submitted = true

    })
  }




}
