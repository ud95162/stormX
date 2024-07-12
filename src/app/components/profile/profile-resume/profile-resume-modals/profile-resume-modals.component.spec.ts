import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResumeModalsComponent } from './profile-resume-modals.component';

describe('ProfileResumeModalsComponent', () => {
  let component: ProfileResumeModalsComponent;
  let fixture: ComponentFixture<ProfileResumeModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileResumeModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileResumeModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
