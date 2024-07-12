import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizedLeavesByDesGroupComponent } from './utilized-leaves-by-des-group.component';

describe('UtilizedLeavesByDesGroupComponent', () => {
  let component: UtilizedLeavesByDesGroupComponent;
  let fixture: ComponentFixture<UtilizedLeavesByDesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizedLeavesByDesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizedLeavesByDesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
