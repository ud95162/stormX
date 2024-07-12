import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTimelineEditModalComponent } from './profile-timeline-edit-modal.component';

describe('ProfileTimelineEditModalComponent', () => {
  let component: ProfileTimelineEditModalComponent;
  let fixture: ComponentFixture<ProfileTimelineEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTimelineEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTimelineEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
