import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadGrowthTurnOverCumulativeComponent } from './head-growth-turn-over-cumulative.component';

describe('HeadGrowthTurnOverCumulativeComponent', () => {
  let component: HeadGrowthTurnOverCumulativeComponent;
  let fixture: ComponentFixture<HeadGrowthTurnOverCumulativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadGrowthTurnOverCumulativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadGrowthTurnOverCumulativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
