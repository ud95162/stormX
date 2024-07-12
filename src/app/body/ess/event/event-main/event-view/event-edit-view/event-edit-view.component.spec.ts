import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventEditViewComponent} from './event-edit-view.component';

describe('EventEditViewComponent', () => {
  let component: EventEditViewComponent;
  let fixture: ComponentFixture<EventEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventEditViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
