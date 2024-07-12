import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileAppraisalSelfAppraisalFormComponent} from './profile-appraisal-self-appraisal-form.component';

describe('ProfileAppraisalSelfAppraisalFormComponent', () => {
  let component: ProfileAppraisalSelfAppraisalFormComponent;
  let fixture: ComponentFixture<ProfileAppraisalSelfAppraisalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppraisalSelfAppraisalFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalSelfAppraisalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
