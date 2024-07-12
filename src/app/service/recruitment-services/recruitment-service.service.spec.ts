import {TestBed} from '@angular/core/testing';

import {RecruitmentServiceService} from './recruitment-service.service';

describe('RecruitmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecruitmentServiceService = TestBed.get(RecruitmentServiceService);
    expect(service).toBeTruthy();
  });
});
