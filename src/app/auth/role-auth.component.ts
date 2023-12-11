import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleAuth {
    constructor() { }
    roleAccesses(role:String,url:string){
        if(role == 'COLABORADOR'){
            return this.employeeAccess(url);
        }
        if(role == 'COORDENADOR'){
            return this.managerAccess(url);
        }
        if(role == 'DIRETOR'){
            return this.directorAccess(url);
        }


        return false;
    }

    employeeAccess(url: string):boolean{
        return  url == 'profile'|| url == 'calendar' || url == 'files' || url == 'event-details' || url == 'activeVacations' || url == 'createVacationRequest'|| url == 'users' || url == 'myFiles' || url == 'groups';
    }
    managerAccess(url: string):boolean{
        return this.employeeAccess(url) || url == 'markPresences' || url == 'pendingVacationRequests' || url == 'createUserGroup' || url == 'createEvent' || url =='attendanceSheet';
    }

    directorAccess(url: string): boolean{
        return this.managerAccess(url) || url == 'register' || url == 'createProject'
    }

}