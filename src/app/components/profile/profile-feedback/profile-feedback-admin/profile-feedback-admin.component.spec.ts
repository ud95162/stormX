import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedbackAdminComponent } from './profile-feedback-admin.component';

describe('ProfileFeedbackAdminComponent', () => {
  let component: ProfileFeedbackAdminComponent;
  let fixture: ComponentFixture<ProfileFeedbackAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFeedbackAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFeedbackAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
