import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileAppraisalComponent} from './profile-appraisal.component';

describe('ProfileAppraisalComponent', () => {
  let component: ProfileAppraisalComponent;
  let fixture: ComponentFixture<ProfileAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppraisalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
