import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  designation = '';
  location = '';



  constructor(private projectService: ProjectService){}


  onSubmit(): void {

    this.projectService.createProject(this.designation, this.location).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


  

}
