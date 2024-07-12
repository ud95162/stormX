import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhRequestMainComponent } from './wfh-request-main.component';

describe('WfhRequestMainComponent', () => {
  let component: WfhRequestMainComponent;
  let fixture: ComponentFixture<WfhRequestMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhRequestMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
