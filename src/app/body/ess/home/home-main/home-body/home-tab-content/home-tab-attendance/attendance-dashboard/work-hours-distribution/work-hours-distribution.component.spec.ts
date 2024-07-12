import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHoursDistributionComponent } from './work-hours-distribution.component';

describe('WorkHoursDistributionComponent', () => {
  let component: WorkHoursDistributionComponent;
  let fixture: ComponentFixture<WorkHoursDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkHoursDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHoursDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
