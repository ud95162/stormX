import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileAppraisalAppraisalInterviewsComponent} from './profile-appraisal-appraisal-interviews.component';

describe('ProfileAppraisalAppraisalInterviewsComponent', () => {
  let component: ProfileAppraisalAppraisalInterviewsComponent;
  let fixture: ComponentFixture<ProfileAppraisalAppraisalInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppraisalAppraisalInterviewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalAppraisalInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
