import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventViewSidebarComponent} from './event-view-sidebar.component';

describe('EventViewSidebarComponent', () => {
  let component: EventViewSidebarComponent;
  let fixture: ComponentFixture<EventViewSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
