import { TestBed } from '@angular/core/testing';

import { HrAnalyticsService } from './hr-analytics.service';

describe('HrAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrAnalyticsService = TestBed.get(HrAnalyticsService);
    expect(service).toBeTruthy();
  });
});
