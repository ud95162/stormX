import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountOfLeavesGraphComponent } from './total-count-of-leaves-graph.component';

describe('TotalCountOfLeavesGraphComponent', () => {
  let component: TotalCountOfLeavesGraphComponent;
  let fixture: ComponentFixture<TotalCountOfLeavesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCountOfLeavesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountOfLeavesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
