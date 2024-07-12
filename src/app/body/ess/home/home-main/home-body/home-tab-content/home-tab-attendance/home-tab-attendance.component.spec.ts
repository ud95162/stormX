import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabAttendanceComponent } from './home-tab-attendance.component';

describe('HomeTabAttendanceComponent', () => {
  let component: HomeTabAttendanceComponent;
  let fixture: ComponentFixture<HomeTabAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
