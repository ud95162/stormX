import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileAppraisalPerformanceAppraisalFormComponent} from './profile-appraisal-performance-appraisal-form.component';

describe('ProfileAppraisalPerformanceAppraisalFormComponent', () => {
  let component: ProfileAppraisalPerformanceAppraisalFormComponent;
  let fixture: ComponentFixture<ProfileAppraisalPerformanceAppraisalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppraisalPerformanceAppraisalFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalPerformanceAppraisalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
