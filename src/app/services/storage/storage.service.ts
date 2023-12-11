import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { is } from 'date-fns/locale';
import { User } from 'src/app/models/user.model';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'mundoasorrir';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private authService : AuthService) {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
  public getRole(): string{
    return this.getUser().role;
  }

  public isDirector(): boolean{
    return this.getRole() == 'DIRETOR' ;
  }

  public isManager(): boolean{
    return this.getRole() == 'COORDENADOR' || this.isDirector();
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    let isLoggedIn : boolean = false;
    this.authService.isLoggedIn().subscribe(res => {
      isLoggedIn = res;
      if(res == true){
        isLoggedIn = true;
        this.authService.getUser().subscribe(usr => {
          this.saveUser(usr);
        })

      }else{
        isLoggedIn = false;
        this.clean();

      }
      return isLoggedIn;

    })

    return this.isLogged();
    


  }
  public isLogged(): boolean{
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;

  }
}