import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileLogsComponent} from './profile-logs.component';

describe('ProfileLogsComponent', () => {
  let component: ProfileLogsComponent;
  let fixture: ComponentFixture<ProfileLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLogsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
