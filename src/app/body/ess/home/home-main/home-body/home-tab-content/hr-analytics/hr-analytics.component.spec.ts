import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAnalyticsComponent } from './hr-analytics.component';

describe('HrAnalyticsComponent', () => {
  let component: HrAnalyticsComponent;
  let fixture: ComponentFixture<HrAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
