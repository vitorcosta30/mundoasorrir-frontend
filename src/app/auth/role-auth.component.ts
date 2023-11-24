import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleAuth {
    constructor() { }
    roleAccesses(role:String,url:string){
        if(role == 'EMPLOYEE'){
            return this.employeeAccess(url);
        }
        if(role == 'MANAGER'){
            return this.managerAccess(url);
        }

        return false;
    }

    employeeAccess(url: string):boolean{
        return  url == 'profile'|| url == 'calendar';
    }
    managerAccess(url: string):boolean{
        return url =='register' || url == 'profile'|| url == 'calendar' || url == 'files' || url == 'createEvent' || url == 'users' || url == 'createUserGroup' || url == 'event-details' || url == 'createVacationRequest' || url == 'pendingVacationRequests' || url == 'activeVacations';
    }

}