import { TestBed } from '@angular/core/testing';

import { BenchViewService } from './bench-view.service';

describe('BenchViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BenchViewService = TestBed.get(BenchViewService);
    expect(service).toBeTruthy();
  });
});
