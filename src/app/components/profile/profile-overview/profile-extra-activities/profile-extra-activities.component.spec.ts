import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExtraActivitiesComponent } from './profile-extra-activities.component';

describe('ProfileExtraActivitiesComponent', () => {
  let component: ProfileExtraActivitiesComponent;
  let fixture: ComponentFixture<ProfileExtraActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileExtraActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExtraActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
