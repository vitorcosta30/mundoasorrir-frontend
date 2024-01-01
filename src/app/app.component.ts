import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { SystemEventService } from './systemEvent/systemEvent.service';
import { RoleAuth } from './auth/role-auth.component';
import {Location} from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
    private location: Location,
    private storageService: StorageService,
    private authService: AuthService,
    private systemEventService: SystemEventService,
    private roleAuth: RoleAuth,
    private router: Router,
    private route: ActivatedRoute,

    
  ) {}

  ngOnInit(): void {
    this.check();

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

  backClicked() {
    this.location.back();
  }

  check(): void{
    this.authService.isLoggedIn().subscribe(res => {
      if(res == true){
        this.isLoggedIn = true;
        this.authService.refreshToken().subscribe(res =>{
          this.authService.getUser().subscribe(usr => {
            this.storageService.saveUser(usr);
            const user = this.storageService.getUser();
            this.username = user.username;
            this.roles = user.roles;
            if (this.route.snapshot.queryParams['returnUrl']) {
              this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl')], { });
    
            }
          })
        })
      }else{
        this.isLoggedIn = false;
        this.storageService.clean();
        this.router.navigate(['/login'], { });

      }  
    })
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
        //this.check()

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
