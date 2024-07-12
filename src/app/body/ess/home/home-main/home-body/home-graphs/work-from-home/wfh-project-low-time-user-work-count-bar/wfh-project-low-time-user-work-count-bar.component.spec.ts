import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhProjectLowTimeUserWorkCountBarComponent } from './wfh-project-low-time-user-work-count-bar.component';

describe('WfhProjectLowTimeUserWorkCountBarComponent', () => {
  let component: WfhProjectLowTimeUserWorkCountBarComponent;
  let fixture: ComponentFixture<WfhProjectLowTimeUserWorkCountBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhProjectLowTimeUserWorkCountBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhProjectLowTimeUserWorkCountBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
