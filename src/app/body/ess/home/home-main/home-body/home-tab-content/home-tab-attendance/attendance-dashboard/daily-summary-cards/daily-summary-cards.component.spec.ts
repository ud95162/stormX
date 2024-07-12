import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryCardsComponent } from './daily-summary-cards.component';

describe('DailySummaryCardsComponent', () => {
  let component: DailySummaryCardsComponent;
  let fixture: ComponentFixture<DailySummaryCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
