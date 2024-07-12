import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAttendanceSummeryComponent } from './overall-attendance-summery.component';

describe('OverallAttendancesummaryComponent', () => {
  let component: OverallAttendanceSummeryComponent;
  let fixture: ComponentFixture<OverallAttendanceSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallAttendanceSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallAttendanceSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
