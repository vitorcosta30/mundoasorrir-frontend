import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { User } from '../user/user.model';
import { UserService } from '../services/user/user.service';
import { UserGroup } from '../create-user-group/user-group.model';
import { GroupService } from '../services/groups/group.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  currentFile?: File;
  progress = 0;
  message = '';
  users: string[] = [];

  availableUsers: User[] = [];

  availableGroups: UserGroup[] = [];



  addUser(): void{
    this.users.push(' ')
  }
  groups: string[] = [];



  addGroup(): void{
    this.groups.push('')
  }
  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService, private userService: UserService,private groupService: GroupService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getGroups();
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(res => this.availableUsers = res)
  }
  getGroups(): void{
    this.groupService.getGroupsSimple().subscribe(res => this.availableGroups = res)
  }




  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile,this.users,this.groups).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }

  }
}