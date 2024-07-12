import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSummeryComponent } from './attendance-summery.component';

describe('AttendanceSummeryComponent', () => {
  let component: AttendanceSummeryComponent;
  let fixture: ComponentFixture<AttendanceSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
