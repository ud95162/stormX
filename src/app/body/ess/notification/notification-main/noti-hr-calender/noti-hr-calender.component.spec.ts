import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotiHrCalenderComponent} from './noti-hr-calender.component';

describe('NotiHrCalenderComponent', () => {
  let component: NotiHrCalenderComponent;
  let fixture: ComponentFixture<NotiHrCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotiHrCalenderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiHrCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
