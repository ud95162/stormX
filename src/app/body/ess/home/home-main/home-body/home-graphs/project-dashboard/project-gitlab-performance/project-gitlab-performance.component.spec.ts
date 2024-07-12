import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGitlabPerformanceComponent } from './project-gitlab-performance.component';

describe('ProjectGitlabPerformanceComponent', () => {
  let component: ProjectGitlabPerformanceComponent;
  let fixture: ComponentFixture<ProjectGitlabPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGitlabPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGitlabPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
