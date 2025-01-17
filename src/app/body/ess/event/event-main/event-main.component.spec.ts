import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventMainComponent} from './event-main.component';

describe('EventMainComponent', () => {
  let component: EventMainComponent;
  let fixture: ComponentFixture<EventMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
