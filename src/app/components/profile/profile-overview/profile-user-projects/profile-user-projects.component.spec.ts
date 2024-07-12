import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserProjectsComponent } from './profile-user-projects.component';

describe('ProfileUserProjectsComponent', () => {
  let component: ProfileUserProjectsComponent;
  let fixture: ComponentFixture<ProfileUserProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
