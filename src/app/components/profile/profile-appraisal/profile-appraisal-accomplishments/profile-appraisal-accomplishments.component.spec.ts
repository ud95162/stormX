import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAppraisalAccomplishmentsComponent } from './profile-appraisal-accomplishments.component';

describe('ProfileAppraisalAccomplishmentsComponent', () => {
  let component: ProfileAppraisalAccomplishmentsComponent;
  let fixture: ComponentFixture<ProfileAppraisalAccomplishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAppraisalAccomplishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAppraisalAccomplishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
