import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhRequestAdminViewComponent } from './wfh-request-admin-view.component';

describe('WfhRequestAdminViewComponent', () => {
  let component: WfhRequestAdminViewComponent;
  let fixture: ComponentFixture<WfhRequestAdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhRequestAdminViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhRequestAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
