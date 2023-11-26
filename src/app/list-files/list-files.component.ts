import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit{
  fileInfos?: Observable<any>;
  constructor(private uploadService: FileUploadService) { }


  ngOnInit(): void {

    this.fileInfos = this.uploadService.getFiles();
  }

}
