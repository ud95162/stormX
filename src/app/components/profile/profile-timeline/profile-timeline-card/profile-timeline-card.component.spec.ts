import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTimelineCardComponent } from './profile-timeline-card.component';

describe('ProfileTimelineCardComponent', () => {
  let component: ProfileTimelineCardComponent;
  let fixture: ComponentFixture<ProfileTimelineCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTimelineCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTimelineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
