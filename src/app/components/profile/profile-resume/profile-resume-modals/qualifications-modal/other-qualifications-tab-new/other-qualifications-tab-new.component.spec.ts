import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherQualificationsTabNewComponent } from './other-qualifications-tab-new.component';

describe('OtherQualificationsTabComponent', () => {
  let component: OtherQualificationsTabNewComponent;
  let fixture: ComponentFixture<OtherQualificationsTabNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherQualificationsTabNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherQualificationsTabNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
