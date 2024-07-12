import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAppraisalBaseCriteriaEvalComponent } from './profile-appraisal-base-criteria-eval.component';

describe('ProfileAppraisalBaseCriteriaEvalComponent', () => {
  let component: ProfileAppraisalBaseCriteriaEvalComponent;
  let fixture: ComponentFixture<ProfileAppraisalBaseCriteriaEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAppraisalBaseCriteriaEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalBaseCriteriaEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
