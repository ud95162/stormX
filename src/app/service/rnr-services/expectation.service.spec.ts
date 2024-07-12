import { TestBed } from '@angular/core/testing';

import { ExpectationService } from './expectation.service';

describe('ExpectationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpectationService = TestBed.get(ExpectationService);
    expect(service).toBeTruthy();
  });
});
