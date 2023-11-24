import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {CalendarComponent} from './calendar/calendar.component';
import { AuthGuard } from './auth/auth-guard.component';
import { CreateEventComponent} from './create-event/create-event.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user/userDetails/user-details.component';
import { CreateUserGroupComponent } from './create-user-group/create-user-group.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { VacationComponent } from './vacation/vacation.component';
import { PendingVacationRequestsComponent } from './pending-vacation-requests/pending-vacation-requests.component';
import { FileDisplayComponent } from './file-display/file-display.component';
import { ActiveVacationsComponent } from './active-vacations/active-vacations.component';

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



  { path: '**', redirectTo: 'login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
