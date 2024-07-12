import { TestBed } from '@angular/core/testing';

import { RequestTimestampService } from './request-timestamp-service.service';

describe('RequestTimestampServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestTimestampService = TestBed.get(RequestTimestampService);
    expect(service).toBeTruthy();
  });
});
