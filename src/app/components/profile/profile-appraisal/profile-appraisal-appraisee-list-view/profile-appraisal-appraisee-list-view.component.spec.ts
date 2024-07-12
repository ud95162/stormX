import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileAppraisalAppraiseeListViewComponent} from './profile-appraisal-appraisee-list-view.component';

describe('ProfileAppraisalAppraiseeListViewComponent', () => {
  let component: ProfileAppraisalAppraiseeListViewComponent;
  let fixture: ComponentFixture<ProfileAppraisalAppraiseeListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppraisalAppraiseeListViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalAppraiseeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
