import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import {CalendarComponent} from './components/calendar/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { httpInterceptorProviders } from './interceptor/http.interceptor';
import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEventComponent } from './components/calendar/create-event/create-event.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UserGroupsComponent } from './components/user-group/user-groups/user-groups.component';
import { AttendanceComponent } from './components/attendance/attendance/attendance.component';
import { UserComponent } from './components/user/user/user.component';
import { UserDetailsComponent } from './components/user/userDetails/user-details.component';
import { CreateUserGroupComponent } from './components/user-group/create-user-group/create-user-group.component';
import { EventDetailsComponent } from './components/calendar/event-details/event-details.component';
import { VacationComponent } from './components/vacation/vacation/vacation.component';
import { PendingVacationRequestsComponent } from './components/vacation/pending-vacation-requests/pending-vacation-requests.component';
import { ActiveVacationsComponent } from './components/vacation/active-vacations/active-vacations.component';
import { ListFilesComponent } from './components/file/list-files/list-files.component';
import { GroupListComponent } from './components/user-group/group-list/group-list.component';
import { GroupDetailsComponent } from './components/user-group/group-details/group-details.component';
import { AttendanceSheetComponent } from './components/attendance/attendance-sheet/attendance-sheet.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { ListProjectsComponent } from './components/project/list-projects/list-projects.component';
import { GetPresencesByUserComponent } from './components/attendance/get-presences-by-user/get-presences-by-user.component';
import { GetUsersOnVacationInProjectComponent } from './components/project/get-users-on-vacation-in-project/get-users-on-vacation-in-project.component';
const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule
];
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    CalendarComponent,
    FileUploadComponent,
    CreateEventComponent,
    UserGroupsComponent,
    AttendanceComponent,
    UserComponent,
    UserDetailsComponent,
    CreateUserGroupComponent,
    EventDetailsComponent,
    VacationComponent,
    PendingVacationRequestsComponent,
    ActiveVacationsComponent,
    ListFilesComponent,
    GroupListComponent,
    GroupDetailsComponent,
    AttendanceSheetComponent,
    CreateProjectComponent,
    ListProjectsComponent,
    GetPresencesByUserComponent,
    GetUsersOnVacationInProjectComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NoopAnimationsModule,
    ...materialModules
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
