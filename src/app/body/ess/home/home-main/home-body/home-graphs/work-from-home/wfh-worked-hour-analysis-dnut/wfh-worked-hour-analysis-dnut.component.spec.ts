import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhWorkedHourAnalysisDnutComponent } from './wfh-worked-hour-analysis-dnut.component';

describe('WfhWorkedHourAnalysisDnutComponent', () => {
  let component: WfhWorkedHourAnalysisDnutComponent;
  let fixture: ComponentFixture<WfhWorkedHourAnalysisDnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhWorkedHourAnalysisDnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhWorkedHourAnalysisDnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
