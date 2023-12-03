import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import {CalendarComponent} from './components/calendar/calendar/calendar.component';
import { AuthGuard } from './auth/auth-guard.component';
import { CreateEventComponent} from './components/calendar/create-event/create-event.component';
import { UserComponent } from './components/user/user/user.component';
import { UserDetailsComponent } from './components/user/userDetails/user-details.component';
import { CreateUserGroupComponent } from './components/user-group/create-user-group/create-user-group.component';
import { EventDetailsComponent } from './components/calendar/event-details/event-details.component';
import { VacationComponent } from './components/vacation/vacation/vacation.component';
import { PendingVacationRequestsComponent } from './components/vacation/pending-vacation-requests/pending-vacation-requests.component';
import { FileDisplayComponent } from './components/file/file-display/file-display.component';
import { ActiveVacationsComponent } from './components/vacation/active-vacations/active-vacations.component';
import { AttendanceComponent } from './components/attendance/attendance/attendance.component';
import { ListFilesComponent } from './components/file/list-files/list-files.component';
import { AttendanceSheetComponent } from './components/attendance/attendance-sheet/attendance-sheet.component';
import { GroupListComponent } from './components/user-group/group-list/group-list.component';
import { GroupDetailsComponent } from './components/user-group/group-details/group-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]  },
  { path: 'files', component: FileUploadComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard]  },
  { path: 'users/:username', component: UserDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard]  },

  { path: 'createEvent', component: CreateEventComponent, canActivate: [AuthGuard]  },
  { path: 'createUserGroup', component: CreateUserGroupComponent, canActivate: [AuthGuard]  },
  { path: 'createVacationRequest', component: VacationComponent, canActivate: [AuthGuard]  },
  { path: 'pendingVacationRequests', component: PendingVacationRequestsComponent, canActivate: [AuthGuard]  },
  { path: 'files/:id', component: FileDisplayComponent, canActivate: [AuthGuard]  },
  { path: 'activeVacations', component: ActiveVacationsComponent, canActivate: [AuthGuard]  },
  { path: 'myFiles', component: ListFilesComponent, canActivate: [AuthGuard]  },
  { path: 'attendanceSheet', component: AttendanceSheetComponent, canActivate: [AuthGuard]  },
  { path: 'groups', component: GroupListComponent, canActivate: [AuthGuard]  },
  { path: 'groups/:id', component: GroupDetailsComponent, canActivate: [AuthGuard]  },



  { path: 'markPresences', component: AttendanceComponent, canActivate: [AuthGuard]  },



  { path: '**', redirectTo: 'login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
