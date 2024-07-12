import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecResGrowthTurnSummaryComponent } from './rec-res-growth-turn-summary.component';

describe('RecResGrowthTurnSummaryComponent', () => {
  let component: RecResGrowthTurnSummaryComponent;
  let fixture: ComponentFixture<RecResGrowthTurnSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecResGrowthTurnSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecResGrowthTurnSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
