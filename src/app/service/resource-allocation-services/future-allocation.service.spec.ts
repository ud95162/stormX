import { TestBed } from '@angular/core/testing';

import { FutureAllocationService } from './future-allocation.service';

describe('FutureAllocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FutureAllocationService = TestBed.get(FutureAllocationService);
    expect(service).toBeTruthy();
  });
});
