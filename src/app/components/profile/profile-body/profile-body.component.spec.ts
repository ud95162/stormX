import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileBodyComponent} from './profile-body.component';

describe('ProfileBodyComponent', () => {
  let component: ProfileBodyComponent;
  let fixture: ComponentFixture<ProfileBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBodyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
