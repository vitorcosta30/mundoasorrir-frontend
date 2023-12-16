import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit{
  projects: Project[] = []


  constructor(private projectService: ProjectService,  private storageService: StorageService){}
  ngOnInit(): void {
    this.getProjects();
  }
  isDirector(): boolean{
    return this.storageService.isDirector();
  }
  activate(id : number): void{
    this.projectService.activateProject(id).subscribe(res =>{
      this.getProjects()
    })

  }
  deactivate(id : number): void{
    this.projectService.deactivateProject(id).subscribe(res =>{
      this.getProjects()
    })
  }

  getProjects(): void {
    this.projectService.getAllProjects().subscribe(res => this.projects = res);

  }


}
