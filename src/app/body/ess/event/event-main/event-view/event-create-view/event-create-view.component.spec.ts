import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventCreateViewComponent} from './event-create-view.component';

describe('EventCreateViewComponent', () => {
  let component: EventCreateViewComponent;
  let fixture: ComponentFixture<EventCreateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventCreateViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
