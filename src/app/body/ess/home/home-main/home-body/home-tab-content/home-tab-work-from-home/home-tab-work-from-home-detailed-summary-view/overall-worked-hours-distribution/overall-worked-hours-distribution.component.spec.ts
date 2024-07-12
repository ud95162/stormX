import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallWorkedHoursDistributionComponent } from './overall-worked-hours-distribution.component';

describe('OverallWorkedHoursDistributionComponent', () => {
  let component: OverallWorkedHoursDistributionComponent;
  let fixture: ComponentFixture<OverallWorkedHoursDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallWorkedHoursDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallWorkedHoursDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
