import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimeAnalysisComponent } from './task-time-analysis.component';

describe('TaskTimeAnalysisComponent', () => {
  let component: TaskTimeAnalysisComponent;
  let fixture: ComponentFixture<TaskTimeAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTimeAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimeAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
