import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAttendanceComponent } from './profile-attendance.component';

describe('ProfileAttendanceComponent', () => {
  let component: ProfileAttendanceComponent;
  let fixture: ComponentFixture<ProfileAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
