import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhRequestHrViewComponent } from './wfh-request-hr-view.component';

describe('WfhRequestHrViewComponent', () => {
  let component: WfhRequestHrViewComponent;
  let fixture: ComponentFixture<WfhRequestHrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhRequestHrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhRequestHrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
