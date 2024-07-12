import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPerformanceTimelogComponent } from './project-performance-timelog.component';

describe('ProjectPerformanceTimelogComponent', () => {
  let component: ProjectPerformanceTimelogComponent;
  let fixture: ComponentFixture<ProjectPerformanceTimelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPerformanceTimelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPerformanceTimelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
