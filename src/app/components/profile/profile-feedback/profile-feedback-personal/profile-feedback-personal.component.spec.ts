import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedbackPersonalComponent } from './profile-feedback-personal.component';

describe('ProfileFeedbackPersonalComponent', () => {
  let component: ProfileFeedbackPersonalComponent;
  let fixture: ComponentFixture<ProfileFeedbackPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFeedbackPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFeedbackPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
