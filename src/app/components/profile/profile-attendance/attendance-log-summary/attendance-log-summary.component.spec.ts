import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLogSummaryComponent } from './attendance-log-summary.component';

describe('AttendanceLogSummaryComponent', () => {
  let component: AttendanceLogSummaryComponent;
  let fixture: ComponentFixture<AttendanceLogSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceLogSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceLogSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
