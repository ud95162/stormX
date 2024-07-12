import { TestBed } from '@angular/core/testing';

import { AppreciationServiceService } from './appreciation-service.service';

describe('AppreciationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppreciationServiceService = TestBed.get(AppreciationServiceService);
    expect(service).toBeTruthy();
  });
});
