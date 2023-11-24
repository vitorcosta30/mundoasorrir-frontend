import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveVacationsComponent } from './active-vacations.component';

describe('ActiveVacationsComponent', () => {
  let component: ActiveVacationsComponent;
  let fixture: ComponentFixture<ActiveVacationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveVacationsComponent]
    });
    fixture = TestBed.createComponent(ActiveVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
