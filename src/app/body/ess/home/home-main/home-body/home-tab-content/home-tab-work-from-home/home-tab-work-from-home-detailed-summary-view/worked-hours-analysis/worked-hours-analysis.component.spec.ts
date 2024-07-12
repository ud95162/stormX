import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkedHoursAnalysisComponent } from './worked-hours-analysis.component';

describe('WorkedHoursAnalysisComponent', () => {
  let component: WorkedHoursAnalysisComponent;
  let fixture: ComponentFixture<WorkedHoursAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkedHoursAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkedHoursAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
