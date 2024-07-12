import { TestBed } from '@angular/core/testing';

import { RecruitmentNewService } from './recruitment-new.service';

describe('RecruitmentNewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecruitmentNewService = TestBed.get(RecruitmentNewService);
    expect(service).toBeTruthy();
  });
});
