import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { SystemEventService } from './systemEvent/systemEvent.service';
import { RoleAuth } from './auth/role-auth.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mundoasorrir-frontend';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private systemEventService: SystemEventService,
    private roleAuth: RoleAuth
    
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(res => {
      if(res == true){
        this.isLoggedIn = true;
        this.authService.getUser().subscribe(usr => {
          this.storageService.saveUser(usr);
          const user = this.storageService.getUser();
          this.username = user.username;
          this.roles = user.roles;
        })

      }else{
        this.isLoggedIn = false;
        this.storageService.clean();
      }  
    })
    /*

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;


      this.username = user.username;
    }*/

    this.eventBusSub = this.systemEventService.on('logout', () => {
      this.logout();
    });
  }
  isManager(): boolean{
    return this.roles.includes('MANAGER');
  }
  isEmployee(): boolean{
    return this.roles.includes('EMPLOYEE');
  }
  isAllowed(url: string){
    return this.storageService.isLogged() && this.roleAuth.roleAccesses(this.storageService.getRole(), url)


  }


  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
