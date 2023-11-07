import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink } from '@angular/router';

import { RoleAuth } from './role-auth.component';
import { StorageService } from '../services/storage/storage.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    role? : String;
    isAllowed?: boolean;
    constructor(
        private router: Router,
        private roleAuth: RoleAuth,
        private storageService: StorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storageService.isLoggedIn()) {
            this.role  = this.storageService.getRole();
            this.isAllowed = this.roleAuth.roleAccesses(this.role, route.url[0].path);
            if(this.isAllowed){
                return this.isAllowed;
            }else{
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return this.isAllowed;
            }
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}