import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalPendingsComponent } from './leave-approval-pendings.component';

describe('LeaveApprovalPendingsComponent', () => {
  let component: LeaveApprovalPendingsComponent;
  let fixture: ComponentFixture<LeaveApprovalPendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApprovalPendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApprovalPendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
