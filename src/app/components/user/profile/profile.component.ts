import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: User;
  role: string = "";

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.role = this.storageService.getRole();
  }
}
