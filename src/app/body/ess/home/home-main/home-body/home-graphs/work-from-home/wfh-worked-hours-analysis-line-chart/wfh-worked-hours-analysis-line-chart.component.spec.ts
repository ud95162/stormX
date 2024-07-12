import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhWorkedHoursAnalysisLineChartComponent } from './wfh-worked-hours-analysis-line-chart.component';

describe('WfhWorkedHoursAnalysisLineChartComponent', () => {
  let component: WfhWorkedHoursAnalysisLineChartComponent;
  let fixture: ComponentFixture<WfhWorkedHoursAnalysisLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhWorkedHoursAnalysisLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhWorkedHoursAnalysisLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
