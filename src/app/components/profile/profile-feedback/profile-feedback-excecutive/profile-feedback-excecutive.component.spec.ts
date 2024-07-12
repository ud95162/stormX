import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedbackExcecutiveComponent } from './profile-feedback-excecutive.component';

describe('ProfileFeedbackExcecutiveComponent', () => {
  let component: ProfileFeedbackExcecutiveComponent;
  let fixture: ComponentFixture<ProfileFeedbackExcecutiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFeedbackExcecutiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFeedbackExcecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
