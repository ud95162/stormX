import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAttendanceComponent } from './projects-attendance.component';

describe('ProjectsAttendanceComponent', () => {
  let component: ProjectsAttendanceComponent;
  let fixture: ComponentFixture<ProjectsAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
