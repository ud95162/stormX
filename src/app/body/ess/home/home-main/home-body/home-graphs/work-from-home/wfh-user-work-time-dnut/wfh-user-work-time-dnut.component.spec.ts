import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhUserWorkTimeDnutComponent } from './wfh-user-work-time-dnut.component';

describe('WfhUserWorkTimeDnutComponent', () => {
  let component: WfhUserWorkTimeDnutComponent;
  let fixture: ComponentFixture<WfhUserWorkTimeDnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhUserWorkTimeDnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhUserWorkTimeDnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
