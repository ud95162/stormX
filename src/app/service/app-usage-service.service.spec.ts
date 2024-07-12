import { TestBed } from '@angular/core/testing';

import { AppUsageServiceService } from './app-usage-service.service';

describe('AppUsageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppUsageServiceService = TestBed.get(AppUsageServiceService);
    expect(service).toBeTruthy();
  });
});
