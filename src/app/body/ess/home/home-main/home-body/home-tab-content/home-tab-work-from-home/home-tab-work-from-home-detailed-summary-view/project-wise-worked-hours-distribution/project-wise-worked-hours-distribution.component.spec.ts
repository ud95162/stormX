import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWiseWorkedHoursDistributionComponent } from './project-wise-worked-hours-distribution.component';

describe('ProjectWiseWorkedHoursDistributionComponent', () => {
  let component: ProjectWiseWorkedHoursDistributionComponent;
  let fixture: ComponentFixture<ProjectWiseWorkedHoursDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWiseWorkedHoursDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWiseWorkedHoursDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
