import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeHeaderUserComponent} from './home-header-user.component';

describe('HomeHeaderUserComponent', () => {
  let component: HomeHeaderUserComponent;
  let fixture: ComponentFixture<HomeHeaderUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeHeaderUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
