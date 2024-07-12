import { TestBed } from '@angular/core/testing';

import { HeadCountService } from './head-count.service';

describe('HeadCountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadCountService = TestBed.get(HeadCountService);
    expect(service).toBeTruthy();
  });
});
