import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileInterviewComponent} from './profile-interview.component';

describe('ProfileInterviewComponent', () => {
  let component: ProfileInterviewComponent;
  let fixture: ComponentFixture<ProfileInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInterviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
