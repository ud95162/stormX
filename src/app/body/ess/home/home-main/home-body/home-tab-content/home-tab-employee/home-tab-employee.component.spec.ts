import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTabEmployeeComponent} from './home-tab-employee.component';

describe('HomeTabEmployeeComponent', () => {
  let component: HomeTabEmployeeComponent;
  let fixture: ComponentFixture<HomeTabEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTabEmployeeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
