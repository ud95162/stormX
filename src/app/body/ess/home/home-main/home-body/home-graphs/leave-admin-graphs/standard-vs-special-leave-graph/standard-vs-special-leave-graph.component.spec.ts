import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardVsSpecialLeaveGraphComponent } from './standard-vs-special-leave-graph.component';

describe('StandardVsSpecialLeaveGraphComponent', () => {
  let component: StandardVsSpecialLeaveGraphComponent;
  let fixture: ComponentFixture<StandardVsSpecialLeaveGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardVsSpecialLeaveGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardVsSpecialLeaveGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
