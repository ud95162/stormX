import { TestBed } from '@angular/core/testing';

import { JobsrunnerServiceService } from './jobsrunner-service.service';

describe('JobsrunnerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobsrunnerServiceService = TestBed.get(JobsrunnerServiceService);
    expect(service).toBeTruthy();
  });
});
