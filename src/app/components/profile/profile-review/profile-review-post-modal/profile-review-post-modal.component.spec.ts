import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileReviewPostModalComponent} from './profile-review-post-modal.component';

describe('ProfileReviewPostModalComponent', () => {
  let component: ProfileReviewPostModalComponent;
  let fixture: ComponentFixture<ProfileReviewPostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileReviewPostModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReviewPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
