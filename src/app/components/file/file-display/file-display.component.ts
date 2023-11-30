import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-display',
  templateUrl: './file-display.component.html',
  styleUrls: ['./file-display.component.css']
})
export class FileDisplayComponent implements OnInit {
  id?: number;
  url: string = "";
  uri: any;


  constructor(private fileUploadService: FileUploadService,    private activatedRoute: ActivatedRoute , private sanitizer:DomSanitizer   ){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.url = "http://localhost:9000/api/files/files/"+this.id;
      this.uri = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
;
    })
  }

}
