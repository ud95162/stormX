import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteVisitAndOfficialLeaveComponent } from './onsite-visit-and-official-leave.component';

describe('OnsiteVisitAndOfficialLeaveComponent', () => {
  let component: OnsiteVisitAndOfficialLeaveComponent;
  let fixture: ComponentFixture<OnsiteVisitAndOfficialLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteVisitAndOfficialLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteVisitAndOfficialLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
