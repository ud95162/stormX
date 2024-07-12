import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhRequestUserViewComponent } from './wfh-request-user-view.component';

describe('WfhRequestUserViewComponent', () => {
  let component: WfhRequestUserViewComponent;
  let fixture: ComponentFixture<WfhRequestUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhRequestUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhRequestUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
