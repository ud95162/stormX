import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWiseWorkedHourAnalysisComponent } from './employee-wise-worked-hour-analysis.component';

describe('EmployeeWiseWorkedHourAnalysisComponent', () => {
  let component: EmployeeWiseWorkedHourAnalysisComponent;
  let fixture: ComponentFixture<EmployeeWiseWorkedHourAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWiseWorkedHourAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWiseWorkedHourAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
