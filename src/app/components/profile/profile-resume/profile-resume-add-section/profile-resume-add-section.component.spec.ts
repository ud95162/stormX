import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileResumeAddSectionComponent} from './profile-resume-add-section.component';

describe('ProfileResumeAddSectionComponent', () => {
  let component: ProfileResumeAddSectionComponent;
  let fixture: ComponentFixture<ProfileResumeAddSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileResumeAddSectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileResumeAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
