import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAnalyticsMainComponent } from './hr-analytics-main.component';

describe('HrAnalyticsMainComponent', () => {
  let component: HrAnalyticsMainComponent;
  let fixture: ComponentFixture<HrAnalyticsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAnalyticsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAnalyticsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
