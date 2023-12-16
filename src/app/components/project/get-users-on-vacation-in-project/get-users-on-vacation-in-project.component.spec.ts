import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsersOnVacationInProjectComponent } from './get-users-on-vacation-in-project.component';

describe('GetUsersOnVacationInProjectComponent', () => {
  let component: GetUsersOnVacationInProjectComponent;
  let fixture: ComponentFixture<GetUsersOnVacationInProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUsersOnVacationInProjectComponent]
    });
    fixture = TestBed.createComponent(GetUsersOnVacationInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
