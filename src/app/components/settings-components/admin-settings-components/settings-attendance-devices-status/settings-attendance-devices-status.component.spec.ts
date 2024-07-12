import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAttendanceDevicesStatusComponent } from './settings-attendance-devices-status.component';

describe('SettingsAttendanceDevicesStatusComponent', () => {
  let component: SettingsAttendanceDevicesStatusComponent;
  let fixture: ComponentFixture<SettingsAttendanceDevicesStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAttendanceDevicesStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAttendanceDevicesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
