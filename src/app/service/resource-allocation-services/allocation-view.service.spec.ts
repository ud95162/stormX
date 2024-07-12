import { TestBed } from '@angular/core/testing';

import { AllocationViewService } from './allocation-view.service';

describe('AllocationViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllocationViewService = TestBed.get(AllocationViewService);
    expect(service).toBeTruthy();
  });
});
