import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotiBdayCalComponent} from './noti-bday-cal.component';

describe('NotiBdayCalComponent', () => {
  let component: NotiBdayCalComponent;
  let fixture: ComponentFixture<NotiBdayCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotiBdayCalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiBdayCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
