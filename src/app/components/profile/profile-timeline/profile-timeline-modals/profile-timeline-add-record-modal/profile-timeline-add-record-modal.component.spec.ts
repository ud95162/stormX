import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTimelineAddRecordModalComponent } from './profile-timeline-add-record-modal.component';

describe('ProfileTimelineAddRecordModalComponent', () => {
  let component: ProfileTimelineAddRecordModalComponent;
  let fixture: ComponentFixture<ProfileTimelineAddRecordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTimelineAddRecordModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTimelineAddRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
