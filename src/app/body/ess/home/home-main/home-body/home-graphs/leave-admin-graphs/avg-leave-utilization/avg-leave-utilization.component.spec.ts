import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgLeaveUtilizationComponent } from './avg-leave-utilization.component';

describe('AvgLeaveUtilizationComponent', () => {
  let component: AvgLeaveUtilizationComponent;
  let fixture: ComponentFixture<AvgLeaveUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgLeaveUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgLeaveUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
