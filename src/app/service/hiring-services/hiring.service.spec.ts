import { TestBed } from '@angular/core/testing';

import { HiringService } from './hiring.service';

describe('HiringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiringService = TestBed.get(HiringService);
    expect(service).toBeTruthy();
  });
});
