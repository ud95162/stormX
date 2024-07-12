import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotiEventComponent} from './noti-event.component';

describe('NotiEventComponent', () => {
  let component: NotiEventComponent;
  let fixture: ComponentFixture<NotiEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotiEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
