import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabWorkFromHomeSummaryViewComponent } from './home-tab-work-from-home-summary-view.component';

describe('HomeTabWorkFromHomeSummaryViewComponent', () => {
  let component: HomeTabWorkFromHomeSummaryViewComponent;
  let fixture: ComponentFixture<HomeTabWorkFromHomeSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabWorkFromHomeSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabWorkFromHomeSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
