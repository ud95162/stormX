import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeDetailedSummaryViewComponent } from './home-tab-work-from-home-detailed-summary-view.component';

describe('HomeTabWorkFromHomeDeailedSummaryViewComponent', () => {
  let component: HomeTabWorkFromHomeDetailedSummaryViewComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeDetailedSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeDetailedSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeDetailedSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
