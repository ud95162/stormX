import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAttendanceExceptionsComponent } from './settings-attendance-exceptions.component';

describe('SettingsAttendanceExceptionsComponent', () => {
  let component: SettingsAttendanceExceptionsComponent;
  let fixture: ComponentFixture<SettingsAttendanceExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAttendanceExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAttendanceExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
