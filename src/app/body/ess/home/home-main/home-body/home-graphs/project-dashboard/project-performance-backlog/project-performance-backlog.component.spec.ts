import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPerformanceBacklogComponent } from './project-performance-backlog.component';

describe('ProjectPerformanceBacklogComponent', () => {
  let component: ProjectPerformanceBacklogComponent;
  let fixture: ComponentFixture<ProjectPerformanceBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPerformanceBacklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPerformanceBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
