import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPresencesByUserComponent } from './get-presences-by-user.component';

describe('GetPresencesByUserComponent', () => {
  let component: GetPresencesByUserComponent;
  let fixture: ComponentFixture<GetPresencesByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPresencesByUserComponent]
    });
    fixture = TestBed.createComponent(GetPresencesByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
