import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {CalendarComponent} from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { httpInterceptorProviders } from './interceptor/http.interceptor';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEventComponent } from './create-event/create-event.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user/userDetails/user-details.component';
import { CreateUserGroupComponent } from './create-user-group/create-user-group.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { VacationComponent } from './vacation/vacation.component';
import { PendingVacationRequestsComponent } from './pending-vacation-requests/pending-vacation-requests.component';
import { FileDisplayComponent } from './file-display/file-display.component';
import { ActiveVacationsComponent } from './active-vacations/active-vacations.component';
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
    FileDisplayComponent,
    ActiveVacationsComponent


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
