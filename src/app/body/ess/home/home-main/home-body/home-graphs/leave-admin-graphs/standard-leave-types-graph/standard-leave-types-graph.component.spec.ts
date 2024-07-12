import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardLeaveTypesGraphComponent } from './standard-leave-types-graph.component';

describe('StandardLeaveTypesGraphComponent', () => {
  let component: StandardLeaveTypesGraphComponent;
  let fixture: ComponentFixture<StandardLeaveTypesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardLeaveTypesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardLeaveTypesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
