import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhAverageHoursBarChartComponent } from './wfh-average-hours-bar-chart.component';

describe('WfhAverageHoursBarChartComponent', () => {
  let component: WfhAverageHoursBarChartComponent;
  let fixture: ComponentFixture<WfhAverageHoursBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhAverageHoursBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhAverageHoursBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
