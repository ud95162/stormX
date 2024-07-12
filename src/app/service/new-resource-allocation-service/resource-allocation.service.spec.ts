import { TestBed } from '@angular/core/testing';

import { ResourceAllocationService } from './resource-allocation.service';

describe('ResourceAllocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceAllocationService = TestBed.get(ResourceAllocationService);
    expect(service).toBeTruthy();
  });
});
