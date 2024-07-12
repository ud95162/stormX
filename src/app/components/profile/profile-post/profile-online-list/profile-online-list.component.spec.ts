import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileOnlineListComponent} from './profile-online-list.component';

describe('ProfileOnlineListComponent', () => {
  let component: ProfileOnlineListComponent;
  let fixture: ComponentFixture<ProfileOnlineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileOnlineListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOnlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
