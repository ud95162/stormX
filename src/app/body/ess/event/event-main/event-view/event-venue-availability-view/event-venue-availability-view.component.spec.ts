import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventVenueAvailabilityViewComponent} from './event-venue-availability-view.component';

describe('EventVenueAvailabilityViewComponent', () => {
  let component: EventVenueAvailabilityViewComponent;
  let fixture: ComponentFixture<EventVenueAvailabilityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventVenueAvailabilityViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVenueAvailabilityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
