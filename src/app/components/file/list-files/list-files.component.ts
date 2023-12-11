import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from 'src/app/models/file.model';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit{
  fileInfos: FileModel[] = [];
  constructor(private uploadService: FileUploadService) { }


  ngOnInit(): void {
    this.getFiles();

  }

  getFiles(): void{
    this.uploadService.getFiles().subscribe(res => this.fileInfos = res)
  }

}
