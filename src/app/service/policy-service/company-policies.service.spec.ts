import { TestBed } from '@angular/core/testing';

import { CompanyPoliciesService } from './company-policies.service';

describe('CompanyPoliciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyPoliciesService = TestBed.get(CompanyPoliciesService);
    expect(service).toBeTruthy();
  });
});
