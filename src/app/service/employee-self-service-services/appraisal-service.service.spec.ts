import {TestBed} from '@angular/core/testing';

import {AppraisalServiceService} from './appraisal-service.service';

describe('AppraisalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppraisalServiceService = TestBed.get(AppraisalServiceService);
    expect(service).toBeTruthy();
  });
});
