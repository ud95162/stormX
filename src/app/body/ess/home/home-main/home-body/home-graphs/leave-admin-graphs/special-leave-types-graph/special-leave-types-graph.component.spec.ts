import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialLeaveTypesGraphComponent } from './special-leave-types-graph.component';

describe('SpecialLeaveTypesGraphComponent', () => {
  let component: SpecialLeaveTypesGraphComponent;
  let fixture: ComponentFixture<SpecialLeaveTypesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialLeaveTypesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialLeaveTypesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
